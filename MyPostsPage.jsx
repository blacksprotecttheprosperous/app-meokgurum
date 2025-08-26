// import statements
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Heart, MessageCircle } from "lucide-react";

// 작성글조회페이지
function MyPostsPage({ isLoggedIn, profileImage, posts, currentUser }) {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("전체");

  const myPosts = posts.filter(
    (post) =>
      post.userName === currentUser?.userName &&
      (activeCategory === "전체" || post.category === activeCategory)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(myPosts.length / postsPerPage);

  const categories = ["전체", "동물/반려동물", "여행", "건강/헬스", "연예인"];

  return (
    <div className="myposts-page-container">
      <header className="main-header">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
        <div className="right-header-wrapper">
          <div className="search-bar-container"></div>
          <div className="header-actions">
            {isLoggedIn && (
              <div className="profile-container relative">
                <button className="profile-btn">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <User />
                  )}
                </button>
              </div>
            )}
            {!isLoggedIn && (
              <Link to="/login" className="login-btn">
                로그인
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="myposts-content-area">
        <div className="page-header-section">
          <h2 className="page-title">
            {currentUser?.userName}의 최신 작성글입니다.
          </h2>
          <div className="user-profile-icon">
            <User size={30} />
          </div>
        </div>
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab-btn ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="post-list-area">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <div
                key={post.id}
                className="my-post-card"
                onClick={() =>
                  navigate(`/posts/${post.id}`, { state: post })
                }
                style={{ cursor: "pointer" }}
              >
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
                <div className="post-stats">
                  <span className="stat-item">
                    <Heart size={18} />
                    <span className="stat-count">{post.likes}</span>
                  </span>
                  <span className="stat-item">
                    <MessageCircle size={18} />
                    <span className="stat-count">{post.comments}</span>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-posts-message">작성한 게시글이 없습니다.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination flex justify-center mt-8 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPostsPage;