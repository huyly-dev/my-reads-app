import PropTypes from "prop-types";

const ChangeStatusBook = ({ book, onChangeStatusBook }) => {
  return (
    <div className="book-shelf-changer">
      <select
        value={book.shelf ?? "none"}
        onChange={(event) => onChangeStatusBook(event.target.value, book)}
      >
        <option value="disabled" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

ChangeStatusBook.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeStatusBook: PropTypes.func.isRequired,
};

export default ChangeStatusBook;
