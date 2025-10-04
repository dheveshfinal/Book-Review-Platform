import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const ReviewBookPage = () => {
  const { id: userId } = useParams();
  const [review, setReview] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/bookinfo?page=${page}&limit=${limit}`
        );
        setReview(res.data.books || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        setMessage(error.message);
      }
    };
    fetchData();
  }, [page, limit]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleAddReview = (bookId) => {
    const reviewText = prompt("Enter your review:");
    const rating = prompt("Enter your rating (1-5):");

    if (reviewText && rating) {
      axios
        .post(`http://localhost:8000/bookreview/${bookId}`, {
          userId,
          bookId,
          reviewText,
          rating: parseInt(rating),
        })
        .then(() => alert("Review submitted successfully!"))
        .catch((err) => alert("Error submitting review: " + err.message));
    }
  };

  return (
    <div className="review-book-container">
      <div className="review-animated-bg">
        <div className="light-orb orb-a"></div>
        <div className="light-orb orb-b"></div>
        <div className="light-orb orb-c"></div>
      </div>

      <div className="review-content">
        <div className="review-header">
          <div className="review-header-text">
            <h1 className="review-title">Rate & Review Books</h1>
            <p className="review-subtitle">Share your thoughts with the community</p>
          </div>
          <button 
            onClick={() => navigate(`/viewrating/${userId}`)} 
            className="view-ratings-btn"
          >
            <span className="btn-icon-review">⭐</span>
            View My Ratings
          </button>
        </div>

        {message && (
          <div className="review-error-alert">
            <span className="review-alert-icon">⚠️</span>
            {message}
          </div>
        )}

        <div className="review-table-wrapper">
          <table className="review-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Description</th>
                <th>Author</th>
                <th>Published Year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {review && review.length > 0 ? (
                review.map((data, index) => (
                  <tr key={data._id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <td data-label="Title">
                      <span className="review-book-title">{data.Title}</span>
                    </td>
                    <td data-label="Genre">
                      <span className="review-genre-badge">{data.Genre}</span>
                    </td>
                    <td data-label="Description">
                      <span className="review-description">{data.Description}</span>
                    </td>
                    <td data-label="Author">{data.Author}</td>
                    <td data-label="Published Year">{data.PublishedYear}</td>
                    <td data-label="Action">
                      <button 
                        onClick={() => handleAddReview(data._id)} 
                        className="review-action-btn"
                      >
                        <span className="action-icon">✍️</span>
                        Add Review
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="review-empty-row">
                    <div className="review-empty-state">
                      <span className="review-empty-icon">📖</span>
                      <p>No books available</p>
                      <span className="review-empty-text">Check back later</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="review-pagination">
          <button 
            onClick={handlePrev} 
            disabled={page === 1}
            className="review-page-btn review-prev-btn"
          >
            <span className="page-arrow">←</span>
            Previous
          </button>
          
          <div className="review-page-info">
            <span className="page-text">Page</span>
            <span className="page-current">{page}</span>
            <span className="page-text">of</span>
            <span className="page-total">{totalPages}</span>
          </div>
          
          <button 
            onClick={handleNext} 
            disabled={page === totalPages}
            className="review-page-btn review-next-btn"
          >
            Next
            <span className="page-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewBookPage;