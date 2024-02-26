import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import ChangeStatusBook from "./ChangeStatusBook";

const DEBOUNCE_TIME = 400;

const SearchPage = ({ allBooks, onChangeStatusBook }) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);

  const updateQuery = (query) => {
    setQuery(query);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const searchBooks = async () => {
        try {
          const res = await BooksAPI.search(query.trim());
          if (res?.error) {
            setBooks([]);
            setError(true);
          } else {
            const booksFound = res.map((item) => {
              const bookFound = allBooks.find((book) => book.id === item.id);
              if (bookFound) return bookFound;
              return item;
            });

            setBooks(booksFound);
            setError(false);
          }
        } catch (error) {
          setError(true);
        }
      };
      searchBooks();
    }, DEBOUNCE_TIME);
    return () => {
      clearTimeout(timer);
    };
  }, [allBooks, query]);

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
        <ol className="books-grid">
          {error ? <div>Book not found</div> : renderListBooks}
        </ol>
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  allBooks: PropTypes.array.isRequired,
  onChangeStatusBook: PropTypes.func.isRequired,
};

export default SearchPage;
