import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewAllRating = () => {
  const [books, setBooks] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/allreview");
      const allBooks = res.data.books || [];
      const allReviews = res.data.reviews || [];

      const booksWithReviews = allBooks.map((book) => ({
        ...book,
        reviews: allReviews.filter(
          (r) => r.bookId.toString() === book._id.toString()
        ),
      }));

      setBooks(booksWithReviews);
      setMessage("");
    } catch (err) {
      setMessage(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (bookId) => {
    setExpandedBook(expandedBook === bookId ? null : bookId);
  };

  const filteredBooks = books.filter((book) => {
    const term = searchTerm.toLowerCase();
    return (
      book.Title?.toLowerCase().includes(term) ||
      book.Author?.toLowerCase().includes(term) ||
      book.Genre?.toLowerCase().includes(term) ||
      book.PublishedYear?.toString().includes(term)
    );
  });

  const getAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingStars = (avgRating) => {
    const fullStars = Math.floor(avgRating);
    const hasHalfStar = avgRating % 1 >= 0.5;
    let stars = "⭐".repeat(fullStars);
    if (hasHalfStar) stars += "✨";
    return stars || "No ratings";
  };

  if (loading) {
    return (
      <div className="viewRatingContainer">
        <div className="viewRatingAnimatedBg">
          <div className="viewRatingWave"></div>
          <div className="viewRatingWave"></div>
          <div className="viewRatingWave"></div>
        </div>
        <div className="viewRatingFloatingShapes">
          <div className="viewRatingShape viewRatingCircle"></div>
          <div className="viewRatingShape viewRatingSquare"></div>
          <div className="viewRatingShape viewRatingTriangle"></div>
        </div>
        <div className="viewRatingLoadingSpinner">
          <div className="viewRatingSpinner"></div>
          <p>Loading books and reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="viewRatingContainer">
      {/* Animated Background Waves */}
      <div className="viewRatingAnimatedBg">
        <div className="viewRatingWave"></div>
        <div className="viewRatingWave"></div>
        <div className="viewRatingWave"></div>
      </div>

      {/* Floating Shapes */}
      <div className="viewRatingFloatingShapes">
        <div className="viewRatingShape viewRatingCircle"></div>
        <div className="viewRatingShape viewRatingSquare"></div>
        <div className="viewRatingShape viewRatingTriangle"></div>
        <div className="viewRatingShape viewRatingCircle viewRatingSmall"></div>
        <div className="viewRatingShape viewRatingSquare viewRatingMedium"></div>
      </div>

      {/* Particle Effect */}
      <div className="viewRatingParticles">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="viewRatingParticle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="viewRatingContent">
        {/* Header Section */}
        <div className="viewRatingHeader">
          <div className="viewRatingHeaderContent">
            <h1 className="viewRatingTitle">
              <span className="viewRatingTitleIcon">📚</span>
              Books & Reviews Library
            </h1>
            <p className="viewRatingSubtitle">
              Explore our collection of {books.length} books with detailed reviews
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="viewRatingSearchSection">
          <div className="viewRatingSearchWrapper">
            <span className="viewRatingSearchIcon">🔍</span>
            <input
              type="text"
              placeholder="Search by Title, Author, Genre, or Year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="viewRatingSearchInput"
            />
            {searchTerm && (
              <button
                className="viewRatingClearBtn"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="viewRatingSearchResult">
              Found {filteredBooks.length} result{filteredBooks.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Error Message */}
        {message && (
          <div className="viewRatingErrorMsg">
            <span className="viewRatingErrorIcon">⚠️</span>
            <p>{message}</p>
          </div>
        )}

        {/* Books Table */}
        <div className="viewRatingTableContainer">
          <div className="viewRatingTableWrapper">
            <table className="viewRatingTable">
              <thead>
                <tr>
                  <th className="viewRatingThTitle">📖 Title</th>
                  <th className="viewRatingThGenre">🎭 Genre</th>
                  <th className="viewRatingThDesc">📝 Description</th>
                  <th className="viewRatingThAuthor">✍️ Author</th>
                  <th className="viewRatingThYear">📅 Year</th>
                  <th className="viewRatingThRating">⭐ Rating</th>
                  <th className="viewRatingThReviews">💬 Reviews</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book, bookIndex) => (
                    <React.Fragment key={book._id}>
                      <tr className={`viewRatingBookRow ${bookIndex % 2 === 0 ? 'even' : 'odd'}`}>
                        <td className="viewRatingTdTitle">
                          <div className="viewRatingBookTitle">{book.Title}</div>
                        </td>
                        <td className="viewRatingTdGenre">
                          <span className="viewRatingGenreBadge">{book.Genre}</span>
                        </td>
                        <td className="viewRatingTdDesc">
                          <div className="viewRatingDescription">{book.Description}</div>
                        </td>
                        <td className="viewRatingTdAuthor">{book.Author}</td>
                        <td className="viewRatingTdYear">
                          <span className="viewRatingYearBadge">{book.PublishedYear}</span>
                        </td>
                        <td className="viewRatingTdRating">
                          <div className="viewRatingStars">
                            {getRatingStars(getAverageRating(book.reviews))}
                            <span className="viewRatingAvg">
                              {getAverageRating(book.reviews)}
                            </span>
                          </div>
                        </td>
                        <td className="viewRatingTdReviews">
                          <button
                            onClick={() => toggleExpand(book._id)}
                            className="viewRatingExpandBtn"
                            disabled={book.reviews.length === 0}
                          >
                            {book.reviews.length === 0 ? (
                              <span className="viewRatingNoReviews">No reviews</span>
                            ) : (
                              <>
                                <span className="viewRatingReviewCount">
                                  {book.reviews.length}
                                </span>
                                <span className="viewRatingExpandIcon">
                                  {expandedBook === book._id ? "▲" : "▼"}
                                </span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>

                      {expandedBook === book._id && book.reviews.length > 0 && (
                        <tr className="viewRatingExpandedRow">
                          <td colSpan="7">
                            <div className="viewRatingReviewsContainer">
                              <h3 className="viewRatingReviewsTitle">
                                💬 User Reviews ({book.reviews.length})
                              </h3>
                              <div className="viewRatingReviewsList">
                                {book.reviews.map((review, index) => (
                                  <div key={index} className="viewRatingReviewCard">
                                    <div className="viewRatingReviewHeader">
                                      <span className="viewRatingReviewRating">
                                        {getRatingStars(review.rating)}
                                        <span className="viewRatingReviewScore">
                                          {review.rating}/5
                                        </span>
                                      </span>
                                    </div>
                                    <p className="viewRatingReviewText">
                                      "{review.reviewText}"
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="viewRatingNoBooks">
                      <div className="viewRatingEmptyState">
                        <span className="viewRatingEmptyIcon">📚</span>
                        <h3>No books found</h3>
                        <p>Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="viewRatingStats">
          <div className="viewRatingStat">
            <span className="viewRatingStatIcon">📚</span>
            <div>
              <div className="viewRatingStatValue">{books.length}</div>
              <div className="viewRatingStatLabel">Total Books</div>
            </div>
          </div>
          <div className="viewRatingStat">
            <span className="viewRatingStatIcon">💬</span>
            <div>
              <div className="viewRatingStatValue">
                {books.reduce((acc, book) => acc + book.reviews.length, 0)}
              </div>
              <div className="viewRatingStatLabel">Total Reviews</div>
            </div>
          </div>
          <div className="viewRatingStat">
            <span className="viewRatingStatIcon">⭐</span>
            <div>
              <div className="viewRatingStatValue">
                {books.length > 0
                  ? (
                      books.reduce(
                        (acc, book) =>
                          acc + parseFloat(getAverageRating(book.reviews)),
                        0
                      ) / books.length
                    ).toFixed(1)
                  : "0"}
              </div>
              <div className="viewRatingStatLabel">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllRating;