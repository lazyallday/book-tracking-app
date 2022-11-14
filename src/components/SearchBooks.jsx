import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import { search } from '../api/booksApi';
import { debounce } from 'lodash';



const SearchBooks = (props) => {
	const { updateBook } = props;
	const [status, setStatus] = useState('');
	const [books, setBooks] = useState([]);
	const onSearchBook = debounce((searchValue) => {
		if (searchValue) {
			setStatus('searching')
			const maxResults = 20
			search(searchValue, maxResults).then((response) => {
				if (!response) {
					setStatus('empty');
					return setBooks([]);
				}
				if (response.error) {
					setStatus('error');
					return setBooks(response.error);
				}
				const result = response.map((book) => {
					const bookInShelf = props.books.find(b => b.id === book.id);
					if (bookInShelf) {
						book.shelf = bookInShelf.shelf;
					}
					return book;
				});
				setStatus('success');
				setBooks(result);
			})
		} else {
			setStatus('empty');
			setBooks([]);
		}
	}, 500)

	return <div className='search-books'>
		<div className='search-books-bar'>
			<Link	className='close-search' to='/'>Close</Link>
			<div className='search-books-input-wrapper'>
				<input
					onChange={(event) => onSearchBook(event.target.value)}
					status='text'
					placeholder='Search by title or author'
				/>
			</div>
		</div>
		<div className='search-books-results'>
			<ol className='books-grid'>
				{status === 'searching' && (
					<div className='search-book-results-msg'>Searching...</div>
				)}
				{status === 'success' && (
					books.map((book) => (
						<Book
							key={book.id}
							book={book}
							updateBook={updateBook}
						/>
					))
				)}

				{(status === 'error' || status === 'empty') && (
					<div className='search-book-results-msg'>No results</div>
				)}

			</ol>
		</div>
	</div>
}

export default SearchBooks;
