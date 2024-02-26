import PropTypes from "prop-types";
import { SHELFS } from "../utils/Shelf";

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
        {SHELFS.map((item) => (
          <option key={item.id} value={item.shelfName}>
            {item.shelfDisplayName}
          </option>
        ))}
      </select>
    </div>
  );
};

ChangeStatusBook.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeStatusBook: PropTypes.func.isRequired,
};

export default ChangeStatusBook;
