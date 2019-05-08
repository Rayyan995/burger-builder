import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./HOC/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/Checkout/Checkout";
import Orders from "./container/Orders/Orders";

class App extends Component {
  render() {
    return (
      <div>
        {/* <div className={classes.Plural}> I'm plural dive</div> */}
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
