// import statements
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 비밀번호 찾는 페이지
function FindPasswordPage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const handleFindPassword = async () => {
    try {
      const response = await fetch("/auth/findpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, email }),
      });

      if (response.ok) {
        alert("비밀번호 변경 링크가 이메일로 전송되었습니다.");
      } else {
        alert("계정을 찾을 수 없습니다. 아이디와 이메일을 확인해주세요.");
      }
    } catch (error) {
      console.error("비밀번호 찾기 중 오류 발생:", error);
      alert("비밀번호 찾기 중 문제가 발생했습니다.");
    }
  };
  return (
    <div className="findpwd-page">
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
        <div className="user-info"></div>
      </header>

      <main className="findpwd-container">
        <h2 className="findpwd-title">비밀번호 찾기</h2>
        <div className="findpwd-form-group">
          <label className="findpwd-form-label">ID</label>
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="findpwd-form-group">
          <label className="findpwd-form-label">Email</label>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="findpwd-complete-btn" onClick={handleFindPassword}>
          완료
        </button>
      </main>
    </div>
  );
}

export default FindPasswordPage;