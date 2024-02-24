import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import { useEffect, useState } from "react";

const BookList = ({ books, onChangeStatusBook }) => {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);

  useEffect(() => {
    setCurrentlyReading(
      books.filter((item) => item.shelf === "currentlyReading")
    );
    setWantToRead(books.filter((item) => item.shelf === "wantToRead"));
    setRead(books.filter((item) => item.shelf === "read"));
  }, [books]);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            books={currentlyReading}
            type={"Currently Reading"}
            onChangeStatusBook={onChangeStatusBook}
          />
          <BookShelf
            books={wantToRead}
            type={"Want to Read"}
            onChangeStatusBook={onChangeStatusBook}
          />
          <BookShelf
            books={read}
            type={"Read"}
            onChangeStatusBook={onChangeStatusBook}
          />
        </div>
      </div>

      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeStatusBook: PropTypes.func.isRequired
};

export default BookList;
