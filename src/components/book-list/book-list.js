import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested, booksError } from '../../actions';
import { compose } from '../../utils';

import './book-list.css';

class BookList extends Component {
    componentDidMount() {
        const {bookstoreService, booksLoaded, booksRequested, booksError} = this.props;
        booksRequested();
        bookstoreService.getBooks()
            .then((data) => booksLoaded(data))
            .catch((err) => booksError(err));
    }

    render() {
        const {books, loading, error} = this.props;

        if (loading) {
            return <Spinner />;
        }

        if (error) {
            return <ErrorIndicator />;
        }

        return (
            <ul className="book-list">
                {books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem book={book} />
                        </li>
                    );
                })}
            </ul>
        );
    }
}

const mapStateToProps = ({books, loading, error}) => {
    return {
        books,
        loading,
        error
    };
};

const mapDispatchToProps = {
    booksLoaded,
    booksRequested,
    booksError
};

//const mapDispatchToProps = (dispatch) => {
    //return bindActionCreators({booksLoaded}, dispatch);

    /*
    return {
        booksLoaded: (newBooks) => {
            dispatch(booksLoaded(newBooks));
        }
    };
    */

    /*
    return {
        booksLoaded: (newBooks) => {
            dispatch({
                type: 'BOOKS_LOADED',
                payload: newBooks
            });
        }
    };
    */
//};

//export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));

export default compose(withBookstoreService(), connect(mapStateToProps, mapDispatchToProps))(BookList);
