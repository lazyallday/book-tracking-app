import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import { getAll, update } from './api/booksApi';
import BookList from './components/BookList';
import SearchBooks from './components/SearchBooks';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = () => getAll().then((res) => setBooks(res));
    getBooks();
  }, []);

  const updateBook = (book, shelf) => {
    book.shelf = shelf;
    update(book, shelf)
      .then(() => setBooks([...books.filter((b) => b.id !== book.id), book]));
  }

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={
            <BookList
              books={books}
              updateBook={updateBook}
            />
          }
          />
          <Route exact
            path='/search' element={
              <SearchBooks
                books={books}
                updateBook={updateBook}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;