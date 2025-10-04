import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewMyRatingPage = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedRating, setEditedRating] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/Userreview/${id}`);
      setReviews(res.data.reviews || []);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setEditedText(review.reviewText);
    setEditedRating(review.rating);
  };

  const handleSave = async (reviewId) => {
    try {
      await axios.put(`http://localhost:8000/Userreview/${reviewId}`, {
        reviewText: editedText,
        rating: editedRating,
      });
      setEditingId(null);
      fetchReviews();
    } catch (err) {
      alert("Error updating review: " + err.message);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(`http://localhost:8000/Userreview/${reviewId}`);
      fetchReviews();
    } catch (err) {
      alert("Error deleting review: " + err.message);
    }
  };

  return (
    <div className="my-rating-container">
      <div className="bubble-background">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
        <div className="bubble bubble-6"></div>
      </div>

      <div className="my-rating-content">
        <div className="my-rating-header">
          <div className="header-text-section">
            <h1 className="my-rating-title">My Reviews & Ratings</h1>
            <p className="my-rating-subtitle">Manage your book reviews</p>
          </div>
          <button onClick={() => navigate("/viewallreview")} className="all-reviews-btn">
            <span className="all-reviews-icon">📚</span>
            All Reviews
          </button>
        </div>

        {message && (
          <div className="my-rating-error">
            <span className="error-icon-rating">⚠️</span>
            {message}
          </div>
        )}

        <div className="my-rating-table-wrapper">
          <table className="my-rating-table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length > 0 ? (
                reviews.map((r, index) => (
                  <tr key={r._id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <td data-label="Book Title">
                      <span className="rating-book-title">{r.Title}</span>
                    </td>
                    <td data-label="Review">
                      {editingId === r._id ? (
                        <input
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          className="rating-edit-input"
                        />
                      ) : (
                        <span className="rating-review-text">{r.reviewText}</span>
                      )}
                    </td>
                    <td data-label="Rating">
                      {editingId === r._id ? (
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={editedRating}
                          onChange={(e) => setEditedRating(e.target.value)}
                          className="rating-edit-input small"
                        />
                      ) : (
                        <span className="rating-stars">
                          {"⭐".repeat(r.rating)}
                          <span className="rating-number">({r.rating})</span>
                        </span>
                      )}
                    </td>
                    <td data-label="Actions">
                      <div className="rating-action-buttons">
                        {editingId === r._id ? (
                          <button onClick={() => handleSave(r._id)} className="rating-btn save-rating-btn">
                            💾 Save
                          </button>
                        ) : (
                          <button onClick={() => handleEdit(r)} className="rating-btn edit-rating-btn">
                            ✏️ Edit
                          </button>
                        )}
                        <button onClick={() => handleDelete(r._id)} className="rating-btn delete-rating-btn">
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="rating-empty-row">
                    <div className="rating-empty-state">
                      <span className="rating-empty-icon">📝</span>
                      <p>No reviews found</p>
                      <span className="rating-empty-text">Start reviewing books</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewMyRatingPage;