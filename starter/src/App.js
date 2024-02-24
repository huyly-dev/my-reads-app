import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import BookList from "./components/BookList";
import SearchPage from "./components/SearchPage";
import * as BooksAPI from "./utils/BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const res = await BooksAPI.getAll();
    setBooks(res);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const onChangeStatusBook = (shelf, book) => {
    const updateBook = async () => {
      const res = await BooksAPI.update(book, shelf);
      getBooks();
    };

    updateBook();
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <BookList books={books} onChangeStatusBook={onChangeStatusBook} />
        }
      ></Route>
      <Route
        path="search"
        element={<SearchPage onChangeStatusBook={onChangeStatusBook} />}
      ></Route>
    </Routes>
  );
}

export default App;
