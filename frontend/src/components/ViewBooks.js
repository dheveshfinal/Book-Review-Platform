import { useState, useEffect } from "react";
import axios from "axios";


const ViewBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/viewbooks?page=${page}&limit=${limit}`
      );
      setBooks(res.data.books);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching books");
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (books.length === limit) setPage(page + 1);
  };

  return (
    <div className="view-books-container">
      <div className="animated-backdrop">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      <div className="view-books-content">
        <div className="page-header">
          <h1 className="header-title">User Books Library</h1>
          <p className="header-subtitle">Browse through the collection</p>
        </div>

        {message && (
          <div className="error-alert">
            <span className="alert-icon">⚠️</span>
            {message}
          </div>
        )}

        <div className="books-table-wrapper">
          <table className="books-display-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Genre</th>
                <th>Published Year</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book, index) => (
                  <tr key={book._id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <td data-label="Title">
                      <span className="book-title-text">{book.Title}</span>
                    </td>
                    <td data-label="Author">{book.Author}</td>
                    <td data-label="Description">
                      <span className="description-content">{book.Description}</span>
                    </td>
                    <td data-label="Genre">
                      <span className="genre-tag">{book.Genre}</span>
                    </td>
                    <td data-label="Published Year">{book.PublishedYear}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-row">
                    <div className="empty-state-view">
                      <span className="empty-icon-view">📚</span>
                      <p>No books available</p>
                      <span className="empty-subtext">Check back later</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-controls">
          <button 
            onClick={handlePrev} 
            disabled={page === 1}
            className="pagination-btn prev-btn"
          >
            <span className="btn-arrow">←</span>
            Previous
          </button>
          
          <div className="page-indicator">
            <span className="page-label">Page</span>
            <span className="page-number">{page}</span>
          </div>
          
          <button 
            onClick={handleNext} 
            disabled={books.length < limit}
            className="pagination-btn next-btn"
          >
            Next
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBooksPage;