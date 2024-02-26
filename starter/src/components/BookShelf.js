import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ChangeStatusBook from "./ChangeStatusBook";

const BookShelf = ({ books, type, onChangeStatusBook }) => {
  let navigate = useNavigate();
  const onNavigate = (bookId) => {
    navigate(`/${bookId}`);
  };
  const renderListBooks = books.map((item) => (
    <li key={item.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${item.imageLinks?.thumbnail})`,
            }}
            onClick={() => onNavigate(item.id)}
          ></div>
          <ChangeStatusBook
            book={item}
            onChangeStatusBook={onChangeStatusBook}
          />
        </div>
        <div className="book-title">{item.title}</div>
        <div className="book-authors">
          {item.authors ? item.authors.join(", ") : ""}
        </div>
      </div>
    </li>
  ));

  return (
    <>
      <div className="bookshelf">
        <h2 className="bookshelf-title"> {type} </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{renderListBooks}</ol>
        </div>
      </div>
    </>
  );
};

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  onChangeStatusBook: PropTypes.func.isRequired,
};

export default BookShelf;
