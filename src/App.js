import React, { Component } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Home from "./components/home";
import LogIn from "./components/login";
import NavBar from "./components/navbar";

import Register from "./components/register";
import Tickets from "./components/tickets";
import AddEditForm from "./components/addEditTicket";
import Ticket from "./components/ticket";
class App extends Component {
  render() {
    return (
      <>
        <main className="container">
          <BrowserRouter>
            <NavBar />
            <switch>
              <Route path="/" exact component={Home} />
              <Route path="/home" exact component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={LogIn} />
              <Route
                path="/add-edit-ticket/:id"
                render={(props) => <AddEditForm {...props} />}
              />
              <Route
                path="/ticket/:id"
                render={(props) => <Ticket {...props} />}
              />
            </switch>
          </BrowserRouter>
        </main>
      </>
    );
  }
}

export default App;
