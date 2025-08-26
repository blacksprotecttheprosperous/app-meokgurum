// import statements
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// New login page component
function LoginPage({ onLogin }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    //css 파일 만들고 난후 여기서부터 끝 표시해논데까지 주석표시해제하시오
   // try {
   //   const response = await fetch("/auth/login", {
   //     method: "POST",
   //     headers: {
   //       "Content-Type": "application/json",
   //     },
   //     body: JSON.stringify({ id, password }),
   //   });

   //   if (response.ok) {
   //     const data = await response.json();
   //     localStorage.setItem("authToken", data.token);
   //     onLogin(data.user);
   //     navigate("/");
   //   } else {
   //     alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
   //   }
   // } catch (error) {
   //   console.error("로그인 중 오류 발생:", error);
   //   alert("로그인 중 문제가 발생했습니다.");
   // }
   //이 곳이 파일 만들고 해제해야하는 부분의 끝
    // ⬇️ 백엔드 연동 비활성화: 로그인 버튼을 누르면 즉시 로그인 상태가 되도록 수정
    const mockUserData = {
      userName: "dummyUser",
      email: "dummy@example.com",
    };
    localStorage.setItem("authToken", "mock-token-for-css");
    onLogin(mockUserData);
    alert("로그인 되었습니다.");
   navigate("/");  // css 파일 만들고 백엔드연동비활성화부분부터 이 부분까지는 지우세요 
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
