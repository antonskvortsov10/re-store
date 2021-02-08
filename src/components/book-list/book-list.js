import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions';
import { compose } from '../../utils';

import './book-list.css';

class BookList extends Component {
    componentDidMount() {
        const {bookstoreService, booksLoaded} = this.props;
        bookstoreService.getBooks()
            .then((data) => {
                booksLoaded(data);
            });
    }

    render() {
        const {books, loading} = this.props;

        if (loading) {
            return <Spinner />;
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

const mapStateToProps = ({books, loading}) => {
    return {
        books,
        loading
    };
};

const mapDispatchToProps = {
    booksLoaded
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
