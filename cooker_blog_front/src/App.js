import logo from './logo.svg';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './pages/authentification/Login';
import Register from './pages/authentification/Register';
import ForgotPassword from './pages/authentification/ForgotPassword';
import './App.css';
import ListBlog from "./pages/admininistration/ListBlog";
import EditBlog from "./pages/admininistration/EditBlog";
import CreateBlog from "./pages/admininistration/CreateBlog";
import BlogListPage from "./pages/blog/List";
import SingleBlogPage from "./pages/blog/Single";
import {AppBar, Button, Toolbar} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

function App() {
  const NavButton = withStyles(() => ({
    root: {
      color: "#FFF",
      "&:hover": {
        color: "#FFF"
      }
    }
  }))(Button);
  return (
      <Router>
        <AppBar position="static">
          <Toolbar>
            <NavButton color="inherit" href="/">Accueil</NavButton>
            <NavButton color="inherit" href="/posts">Articles</NavButton>
            <NavButton color="inherit" href="/login">Connexion</NavButton>
            <NavButton color="inherit" href="/admin/blog">Administration</NavButton>
          </Toolbar>
        </AppBar>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
            </Route>
            <Route path="/posts">
              <BlogListPage/>
            </Route>
            <Route path="/post/:id">
              <SingleBlogPage/>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/forgotpassword">
              <ForgotPassword />
            </Route>
            <Route exact path="/admin/blog">
              <ListBlog />
            </Route>
            <Route path="/admin/blog/:id/edit">
              <EditBlog />
            </Route>
            <Route path="/admin/blog/create">
              <CreateBlog />
            </Route>
          </Switch>
      </Router>
  );
}

export default App;
