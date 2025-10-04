import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";


const BookManagement = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  const fetchBooks = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8000/book/${id}`);
      setBooks(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  }, [id]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8000/bookdelete/${bookId}`);
      setMessage("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  const handleEditClick = (book) => {
    setEditId(book._id);
    setEditData({
      Title: book.Title,
      Author: book.Author,
      Description: book.Description,
      Genre: book.Genre,
      PublishedYear: book.PublishedYear,
    });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async (bookId) => {
    try {
      await axios.put(`http://localhost:8000/booksave/${bookId}`, editData);
      setEditId(null);
      fetchBooks();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="book-management-container">
      <div className="book-management-header">
        <div className="header-content">
          <h1 className="page-title">Book Collection</h1>
          <p className="page-subtitle">Manage your personal library</p>
        </div>
        
        <div className="header-actions">
          <button onClick={() => navigate(`/addbooks/${id}`)} className="action-btn primary-btn">
            <span className="btn-icon">➕</span>
            Add Book
          </button>
          <button onClick={() => navigate(`/viewbooks`)} className="action-btn secondary-btn">
            <span className="btn-icon">👥</span>
            View User Books
          </button>
        </div>
      </div>

      {message && (
        <div className="message-alert">
          <span className="alert-icon">ℹ️</span>
          {message}
        </div>
      )}

      <div className="table-container">
        <table className="books-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Genre</th>
              <th>Published Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book._id} className={editId === book._id ? "editing-row" : ""}>
                  <td data-label="Title">
                    {editId === book._id ? (
                      <input
                        name="Title"
                        value={editData.Title}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    ) : (
                      <span className="book-title">{book.Title}</span>
                    )}
                  </td>
                  <td data-label="Author">
                    {editId === book._id ? (
                      <input
                        name="Author"
                        value={editData.Author}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    ) : (
                      book.Author
                    )}
                  </td>
                  <td data-label="Description">
                    {editId === book._id ? (
                      <input
                        name="Description"
                        value={editData.Description}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    ) : (
                      <span className="description-text">{book.Description}</span>
                    )}
                  </td>
                  <td data-label="Genre">
                    {editId === book._id ? (
                      <input
                        name="Genre"
                        value={editData.Genre}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    ) : (
                      <span className="genre-badge">{book.Genre}</span>
                    )}
                  </td>
                  <td data-label="Published Year">
                    {editId === book._id ? (
                      <input
                        name="PublishedYear"
                        value={editData.PublishedYear}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    ) : (
                      book.PublishedYear
                    )}
                  </td>
                  <td data-label="Actions">
                    <div className="action-buttons">
                      {editId === book._id ? (
                        <button onClick={() => handleSave(book._id)} className="table-btn save-btn">
                          💾 Save
                        </button>
                      ) : (
                        <>
                          <button onClick={() => handleEditClick(book)} className="table-btn edit-btn">
                            ✏️ Edit
                          </button>
                          <button onClick={() => handleDelete(book._id)} className="table-btn delete-btn">
                            🗑️ Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  <div className="empty-state">
                    <span className="empty-icon">📚</span>
                    <p>No books found</p>
                    <span className="empty-text">Start building your collection</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;