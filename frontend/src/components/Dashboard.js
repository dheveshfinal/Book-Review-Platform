import { useNavigate, useParams } from "react-router-dom";

const DashboardPage = () => {
  const { id, name } = useParams(); 
  const navigate = useNavigate();

  const Add_Book = () => {
    navigate(`/addbook/${id}`);
  };

  const Review_Book = () => {
    navigate(`/reviewbook/${id}`);
  };

  return (
    <div className="dashboard-container">
      <div className="animated-bg">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1 className="dashboard-title">Welcome Back, <span className="user-name">{name}</span></h1>
          <p className="dashboard-subtitle">What would you like to do today?</p>
        </div>
        
        <div className="action-buttons">
          <button onClick={Add_Book} className="action-btn add-btn">
            <div className="btn-icon">📚</div>
            <div className="btn-content">
              <h3>Add Book</h3>
              <p>Add a new book to your collection</p>
            </div>
          </button>
          
          <button onClick={Review_Book} className="action-btn review-btn">
            <div className="btn-icon">✍️</div>
            <div className="btn-content">
              <h3>Review Book</h3>
              <p>Share your thoughts on a book</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;