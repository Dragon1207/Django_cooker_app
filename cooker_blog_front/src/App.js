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
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button><Link to="/" style={{color: '#FFF'}}>Accueil</Link></Button>
            <Button><Link to="/posts" style={{color: '#FFF'}}>Articles</Link></Button>
            <Button><Link to="/login" style={{color: '#FFF'}}>Connexion</Link></Button>
            <Button><Link to="/admin/blog" style={{color: '#FFF'}}>Administration</Link></Button>
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
            <PrivateRoute exact path="/admin/blog" component={ListBlog} />
            <PrivateRoute path="/admin/blog/:id/edit" component={EditBlog} />
            <PrivateRoute path="/admin/blog/create" component={CreateBlog} />
          </Switch>
      </Router>
  );
}

export default App;
