import PropTypes from "prop-types";
import ChangeStatusBook from "./ChangeStatusBook";

const BookShelf = ({ books, type, onChangeStatusBook }) => {

  const renderListBooks = books.map((item) => (
    <li key={item.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${item.imageLinks.thumbnail})`,
            }}
          ></div>
          <ChangeStatusBook book={item} onChangeStatusBook={onChangeStatusBook}/>
        </div>
        <div className="book-title">{item.title}</div>
        <div className="book-authors">{item.authors[0]}</div>
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
  onChangeStatusBook: PropTypes.func.isRequired
};

export default BookShelf;
