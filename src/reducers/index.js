const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [],
    orderTotal: 220
};

const updateCartItems = (cartItems, item, idx) => {
    if (idx === -1) {
        return [
            ...cartItems,
            item
        ];
    }

    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1)
    ];
};

const updateCartItem = (book, item) => {
    if (item) {
        return {
            ...item,
            count: item.count + 1,
            total: item.total + book.price
        };
    }
    else {
        return {
            id: book.id,
            title: book.title,
            count: 1,
            total: book.price
        };
    }
};

const reducer = (state = initialState, action) => {
    //console.log(action.type);

    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return {
                ...state,
                books: [],
                loading: true,
                error: null
            };
        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_BOOKS_FAILURE':
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload
            };
        case 'BOOK_ADDED_TO_CART':
            const bookId = action.payload;
            const book = state.books.find((book) => book.id === bookId);
            const itemIndex = state.cartItems.findIndex(({id}) => id === bookId);
            const item = state.cartItems[itemIndex];
            
            

            return {
                ...state,
                cartItems: updateCartItems(state.cartItems, item, itemIndex)
            };



            /*
            const newItem = {
                id: book.id,
                title: book.title,
                count: 1,
                total: book.price
            };

            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    newItem
                ]
            };
            */
            
        default:
            return state;
    }
};

export default reducer;
