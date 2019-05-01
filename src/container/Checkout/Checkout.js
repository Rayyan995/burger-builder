import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import contactData from './ContactData/ContactData';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }
    // componentWillMount() {
    //     // Start of code that extract data from search query from thr URL
    //     const searchQuery = this.props.location.search;
    //     console.log(searchQuery);
    //     const query = new URLSearchParams(searchQuery);
    //     const ingredients = {};
    //     let price = null;
    //     for (var param of query.entries()) {
    //         console.log('the entire pair = ', param)
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         }
    //         else
    //             ingredients[param[0]] = +param[1];
    //     }
    //     console.log('ingredients', ingredients)
    //     this.setState({ ingredients: ingredients, totalPrice: price });
    //     // End of code that extract data from search query from thr URL
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingrs}
                    checkoutCancelld={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path='/checkout/contact-data' component={contactData}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingrs: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);