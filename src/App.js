import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Classification from "./components/Classification";
import Product from "./components/Product";
import About from "./components/About";
import Rule from "./components/Rule";
import buyCart from "./components/buyCart";
import Login from "./components/login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <Navigation /> */}
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/Home" component={Home} exact />
            <Route path="/Classification" component={Classification} exact />
            <Route
              path="/Classification/:class"
              component={Classification}
              exact
            />
            <Route path="/Product/:id" component={Product} exact />
            <Route path="/Rule" component={Rule} exact />
            <Route path="/About" component={About} exact />
            <Route path="/buyCart" component={buyCart} exact />
            <Route path="/Login" component={Login} exact />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
