import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import axios from "../../axios-order";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios
    //   .get("https://rayyan-react-burger.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     console.log(response);
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingrKey => {
        return ingredients[ingrKey];
      })
      .reduce((sum, elem) => {
        return sum + elem;
      }, 0);

    return sum > 0;
  }

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  resetIngredientHanler = () => {
    console.log("Before reset", this.props.ingrs);
    let resetIngredients = { ...this.props.ingrs };
    for (let key in resetIngredients) {
      resetIngredients[key] = 0;
    }
    this.setState({ ingredients: resetIngredients });
    console.log("After reset", this.props.ingrs);

    this.setState({ purchaseable: false });
    this.updatePurchaseState(resetIngredients);
  };
  purchseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchseContinueHandler = () => {
    // Start of code that data through search query in URL
    // const queryParams = [];
    // const ings = this.props.ingrs;
    // for (let i in ings) {
    //   queryParams.push(
    //     encodeURIComponent(i) + "=" + encodeURIComponent(ings[i])
    //   );
    // }

    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   // throught it data is sent...
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });
    // End of code that data through search query in URL

    this.props.history.push('/checkout')
  };

  render() {
    const disabledInfo = { ...this.props.ingrs };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>Ingredients can NOT be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingrs) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingrs} />
          <BuildControls
            ingredientAdded={this.props.oningredientAdded}
            ingredientRemoved={this.props.oningredientRemoved}
            ingredientReset={this.resetIngredientHanler}
            disabled={disabledInfo}
            price={this.props.price}
            ordered={this.purchasingHandler}
            purchasable={this.updatePurchaseState(this.props.ingrs)}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingrs}
          purchaseContinued={this.purchseContinueHandler}
          purchaseCancelled={this.purchseCancelHandler}
          price={this.props.price}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    console.log("this.state.purchasing:", this.state.purchasing);
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingrs: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    oningredientAdded: ingrName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingrName }),
    oningredientRemoved: ingrName =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingrName
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
