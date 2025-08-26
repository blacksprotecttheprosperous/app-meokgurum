// import statements
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// New login page component
function LoginPage({ onLogin }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        onLogin(data.user);
        navigate("/");
      } else {
        alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인 중 문제가 발생했습니다.");
    }
   
  };

  return (
    <div className="login-page">
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
      </header>
      <div className="login-container">
        <h2 className="login-title">로그인</h2>
        <div className="login-form">
          <div className="text-form">
            <label className="input-label">ID</label>
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="text-form">
            <label className="input-label">PWD</label>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <div className="login-links">
          <Link to="/signup" className="login-link">
            회원가입
          </Link>
          <Link to="/findid" className="login-link">
            아이디 찾기
          </Link>
          <Link to="/findpassword" className="login-link">
            비밀번호 찾기
          </Link>
        </div>
        <button className="login-login-btn" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
