import React from 'react';
import Book from './Book';

const BookShelf = (props) => {
	const { books, updateBook } = props;

	return <div className='bookshelf-books'>
		<ol className='books-grid'>
			{books.map((book) => (
				<Book
					key={book.id}
					book={book}
					updateBook={updateBook}
				/>
			))}
		</ol>
	</div>
}

export default BookShelf;
