import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import ChangeStatusBook from "./ChangeStatusBook";

const SearchPage = ({ onChangeStatusBook }) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const updateQuery = (query) => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const searchBooks = async () => {
        const res = await BooksAPI.search(query);

        if (res?.error) {
          setBooks([]);
        } else {
          setBooks(res);
        }
      };
      searchBooks();
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const renderListBooks = books
    ? books.map((item) => (
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
      ))
    : "";

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={"/"} className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">{renderListBooks}</ol>
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  onChangeStatusBook: PropTypes.func.isRequired,
};

export default SearchPage;
