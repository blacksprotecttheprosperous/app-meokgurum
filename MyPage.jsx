// import statements
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

// ✅ 프로필 이미지 업로드 기능이 추가된 마이페이지
function MyPage({ profileImage, setProfileImage, currentUser, onLogout }) {
  const updateProfileImageOnServer = async (base64Image) => {
    try {
      const token = localStorage.getItem("authToken");
      const byteCharacters = atob(base64Image.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      const formData = new FormData();
      formData.append("profileImage", blob, "profile.png");

      const response = await fetch("/users/me", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("프로필 이미지가 성공적으로 변경되었습니다.");
        const updatedUser = await response.json();
        if (updatedUser.profileImageUrl) {
          setProfileImage(updatedUser.profileImageUrl);
        }
      } else {
        alert("프로필 이미지 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("프로필 이미지 변경 중 오류 발생:", error);
      alert("프로필 이미지 변경 중 문제가 발생했습니다.");
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLeave = async (onLogout) => {
    if (
      !window.confirm(
        "탈퇴 시 회원정보는 복구될 수 없습니다. 정말 탈퇴하겠습니까?"
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/users/me", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("회원 탈퇴가 완료되었습니다.");
        onLogout();
        navigate("/");
      } else {
        alert("회원 탈퇴에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원 탈퇴 중 오류 발생:", error);
      alert("회원 탈퇴 중 문제가 발생했습니다.");
    }

    setShowPopup(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        updateProfileImageOnServer(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
        <div className="user-info">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <User size={26} />
          )}
          {currentUser?.userName}
        </div>
      </header>

      <main className="main-content">
        <div className="profile-section">
          <div className="profile-icon relative group">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={100} />
              )}
            </div>
            <label
              htmlFor="profile-upload"
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer"
            >
              <span className="text-center text-sm">업로드</span>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <h2>Welcome, {currentUser?.userName}</h2>
        </div>
        <div className="menu-buttons">
          <button
            className="menu-btn"
            onClick={() => navigate("/change-password")}
          >
            비밀번호 변경
          </button>
          <button className="menu-btn" onClick={() => navigate("/myposts")}>
            작성글 조회
          </button>
          <button className="menu-btn" onClick={() => setShowPopup(true)}>
            계정 탈퇴
          </button>
        </div>
      </main>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-icon">
              <User size={26} />
            </div>
            <p>
              탈퇴 시 회원정보는 복구될 수 없습니다.
              <br />
              정말 탈퇴하겠습니까?
            </p>
            <div className="popup-buttons">
              <button onClick={handleLeave}>예</button>
              <button onClick={() => setShowPopup(false)}>아니오</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPage;