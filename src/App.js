import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./component/common/navBar";
import Movies from "./component/movies";
import NotFound from "./component/notfound";
import Customers from "./component/customers";
import Rentals from "./component/rentals";
import MovieForm from "./component/movieForm";
import LoginForm from "./component/loginForm";
import RegisterForm from "./component/registerForm";
import Profile from "./component/profile";
import Logout from "./component/logout";
import ProtectedRoute from "./component/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" render={(props) => <Movies user={user} {...props} />} />
            <Route path="/customers" exact component={Customers} />
            <Route path="/rentals" exact component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/profile" component={Profile} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
