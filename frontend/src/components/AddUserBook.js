import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const AddBookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [addbook, setAddbook] = useState({
    Title: "",
    Author: "",
    Description: "",
    Genre: "",
    PublishedYear: ""
  });
  const [message, setMessage] = useState("");

  const insertBook = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/adddata/${id}`, {
        ...addbook,
        addedBy: id,
      });
      setMessage("Book added successfully!");
      navigate(`/addbook/${id}`);
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Error while adding book.");
    }
  };

  return (
    <div className="add-book-container">
      <div className="animated-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">Add New Book</h1>
          <p className="form-subtitle">Fill in the details to add a book to your collection</p>
        </div>

        <div className="form-body">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter book title"
              value={addbook.Title}
              onChange={(e) => setAddbook({ ...addbook, Title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter author name"
              value={addbook.Author}
              onChange={(e) => setAddbook({ ...addbook, Author: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              placeholder="Enter book description"
              rows="4"
              value={addbook.Description}
              onChange={(e) => setAddbook({ ...addbook, Description: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Genre</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Fiction, Mystery"
                value={addbook.Genre}
                onChange={(e) => setAddbook({ ...addbook, Genre: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Published Year</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g., 2024"
                value={addbook.PublishedYear}
                onChange={(e) => setAddbook({ ...addbook, PublishedYear: e.target.value })}
              />
            </div>
          </div>

          <button onClick={insertBook} className="submit-btn">
            <span className="btn-text">Save Book</span>
            <span className="btn-icon">📖</span>
          </button>

          {message && (
            <div className={`message-box ${message.includes("success") ? "success" : "error"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBookForm;