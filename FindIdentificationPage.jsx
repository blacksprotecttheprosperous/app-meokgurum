// import statements
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 아이디 찾는 페이지
function FindIdentificationPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const handleFindId = async () => {
    try {
      const response = await fetch("/auth/findid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`당신의 아이디는: ${data.id} 입니다.`);
      } else {
        alert("아이디를 찾을 수 없습니다. 이름과 이메일을 확인해주세요.");
      }
    } catch (error) {
      console.error("아이디 찾기 중 오류 발생:", error);
      alert("아이디 찾기 중 문제가 발생했습니다.");
    }
  };
  return (
    <div className="findid-page">
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
        <div className="user-info"></div>
      </header>

      <main className="findid-container">
        <h2 className="findid-title">아이디 찾기</h2>
        <div className="findid-form-group">
          <label className="findid-form-label">Email</label>
          <input
            type="Email"
            value={email}
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="findid-complete-btn" onClick={handleFindId}>
          완료
        </button>
      </main>
    </div>
  );
}

export default FindIdentificationPage;