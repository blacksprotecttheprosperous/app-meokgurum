import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import MainBoardPage from './components/MainBoardPage';
import LoginPage from './components/LoginPage';
import AuthService from './services/AuthService';

// useNavigate를 클래스 컴포넌트에서 사용하기 위한 래퍼
function withNavigate(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

const MainBoardPageWithNavigate = withNavigate(MainBoardPage);
const LoginPageWithNavigate = withNavigate(LoginPage);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isLoggedIn: false,
      profileImage: null,
      posts: []
    };
  }

  componentDidMount() {
    this.checkTokenValidity();
    this.fetchPosts();
  }

checkTokenValidity = () => {
  if (AuthService.isTokenValid()) {
    // 토큰이 유효하면 사용자 정보 가져오기
    this.fetchCurrentUser();
  } else {
    // 토큰이 없거나 유효하지 않으므로, 로그아웃 상태로 전환
    this.setState({
      isLoggedIn: false,
      currentUser: null,
      profileImage: null
    });
    // AuthService.logout()은 호출하지 않음
  }
};

  fetchCurrentUser = async () => {
    try {
      const userData = await AuthService.getCurrentUser();
      if (userData) {
        this.setState({
          currentUser: userData,
          isLoggedIn: true
        });
      }
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
      this.handleLogout();
    }
  };

  fetchPosts = async () => {
    try {
      const response = await fetch("/posts");
      if (response.ok) {
        const data = await response.json();
        this.setState({ posts: data });
      } else {
        console.error("게시글을 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글 API 호출 중 오류 발생:", error);
    }
  };

  handleLogin = (userData) => {
    this.setState({
      isLoggedIn: true,
      currentUser: userData
    });
    alert("성공적으로 로그인 되었습니다!");
  };

  handleLogout = async () => {
    try {
      await AuthService.logout();
      
      this.setState({
        isLoggedIn: false,
        currentUser: null,
        profileImage: null
      });
      
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      alert("로그아웃 처리 중 문제가 발생했습니다.");
    }
  };

  addPost = (newPost) => {
    this.setState(prevState => ({
      posts: [newPost, ...prevState.posts]
    }));
  };

  setCurrentUser = (user) => {
    this.setState({ currentUser: user });
  };

  setIsLoggedIn = (status) => {
    this.setState({ isLoggedIn: status });
  };

  setProfileImage = (image) => {
    this.setState({ profileImage: image });
  };

  setPosts = (posts) => {
    this.setState({ posts });
  };

  render() {
    const { currentUser, isLoggedIn, profileImage, posts } = this.state;

    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainBoardPageWithNavigate
                isLoggedIn={isLoggedIn}
                onLogout={this.handleLogout}
                profileImage={profileImage}
                posts={posts}
                setPosts={this.setPosts}
                currentUser={currentUser}
                setIsLoggedIn={this.setIsLoggedIn}
                setCurrentUser={this.setCurrentUser}
                setProfileImage={this.setProfileImage}
              />
            }
          />
          <Route 
            path="/login" 
            element={
              <LoginPageWithNavigate 
                onLogin={this.handleLogin} 
              />
            } 
          />
        <Route path="/signup" element={<SignUpPage />} />    
        </Routes>
      </Router>
    );
  }
}

export default App;
