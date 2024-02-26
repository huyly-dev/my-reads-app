import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import BookList from "./components/BookList";
import PageNotFound from "./components/PageNotFound";
import BookDetail from "./components/BookDetail";
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
      await BooksAPI.update(book, shelf);
      const updatedBooks = books.filter((item) => item.id !== book.id);
      setBooks([...updatedBooks, { ...book, shelf: shelf }]);
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
      <Route path="/:bookId" element={<BookDetail />}></Route>
      <Route
        path="search"
        element={
          <SearchPage
            allBooks={books}
            onChangeStatusBook={onChangeStatusBook}
          />
        }
      ></Route>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/page-not-found" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
