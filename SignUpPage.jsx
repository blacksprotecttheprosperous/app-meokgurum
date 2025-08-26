// import statements
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 회원가입 페이지
function SignUpPage() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password, userName, email }),
      });

      if (response.ok) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("회원가입 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="signup-page">
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
      </header>

      <div className="signup-container">
        <h2 className="signup-title">회원가입</h2>
        <div className="signup-form-group">
          <label className="signup-input-label">ID</label>
          <input
            type="text"
            value={id}
            placeholder="아이디"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="signup-form-group">
          <label className="signup-input-label">PWD</label>
          <input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signup-form-group">
          <label className="signup-input-label">Email</label>
          <input
            type="email"
            value={email}
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="signup-complete-btn" onClick={handleSignup}>
          완료
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;