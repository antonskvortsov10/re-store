import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './shop-header.css';

const ShopHeader = ({numItems, total}) => {
    return (
        <header className="shop-header row">
            <Link to="/">
                <div className="logo text-dark">ReStore</div>
            </Link>
            <Link to="/cart">
                <div className="shopping-cart">
                    <i className="cart-icon fa fa-shopping-cart" />
                    {numItems} items (${total})
                </div>
            </Link>
        </header>
    );
};

const mapStateToProps = ({shoppingCart: {cartItems, orderTotal}}) => {
    /*
    let counter = 0;
    cartItems.forEach((cartItem, idx, cartItems) => {
        counter += cartItem.count;
    });

    return {
        numItems: counter,
        total: orderTotal
    };
    */
    return {
        numItems: cartItems.length,
        total: orderTotal
    };
};

export default connect(mapStateToProps)(ShopHeader);
