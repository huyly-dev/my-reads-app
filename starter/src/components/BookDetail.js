import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";

const BookDetail = () => {
  let navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookDetail = async () => {
      try {
        const res = await BooksAPI.get(bookId);
        setBook(res);
        setLoading(false);
      } catch (error) {
        navigate("/page-not-found");
      }
    };
    getBookDetail();
  }, [bookId, navigate]);

  const renderUI = book ? (
    <div className="bookshelf-books">
      <div className="books-grid">
        <div key={book.id}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${book.imageLinks?.thumbnail})`,
                }}
              ></div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">
              {book.authors ? book.authors.join(", ") : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Some thing went wrong!</div>
  );

  return (
    <>
      <div className="list-books-title">
        <h1>Detail page</h1>
      </div>
      {loading ? <div>Loading...</div> : renderUI}
    </>
  );
};

export default BookDetail;
