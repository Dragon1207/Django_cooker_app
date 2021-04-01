import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import Login from './pages/authentification/Login';
import Register from './pages/authentification/Register';
import Profil from './pages/authentification/Profil';
import ForgotPassword from './pages/authentification/ForgotPassword';
import Home from './pages/Home'
import './App.css';
import ListBlog from "./pages/admininistration/ListBlog";
import EditBlog from "./pages/admininistration/EditBlog";
import CreateBlog from "./pages/admininistration/CreateBlog";
import SearchListPage from "./pages/blog/Search";
import BlogListPage from "./pages/blog/List";
import SingleBlogPage from "./pages/blog/Single";
import {AppBar, Button, Container, Toolbar} from "@material-ui/core";
import axiosInstance from './axios';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PrivateRoute from "./PrivateRoute";

const access_token = localStorage.getItem('access');
const refresh_token = localStorage.getItem('refresh');
const Id_User = localStorage.getItem('Id_User');
const is_staff = localStorage.getItem('is_staff');

function App() {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuLeft: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('lg')]: {
                width: '50ch',
                '&:focus': {
                    width: '50ch',
                },
            },
        },
    }));

    const [key, setKey] = useState("")

    let history = useHistory();

    const logout = () => {
        axiosInstance.post(`auth/logout/`, {
          refresh: refresh_token,
        })
        .then((res) => {});
        
        localStorage.clear();
        window.location.href= '/';
    };

    const classes = useStyles();

  return (
      <Router forceRefresh={true}>
        <AppBar position="static">
          <Toolbar>
            <div className="menuLeft">
            <Button><Link to="/" style={{color: '#FFF'}}>Accueil</Link></Button>
            <Button><Link to="/posts" style={{color: '#FFF'}}>Articles</Link></Button>
            {is_staff=="true" && <Button><Link to="/admin/blog" style={{color: '#FFF'}}>Administration</Link></Button>}
            </div>
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Chercher..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="Search"
              onChange={(e) => {
                setKey(e.target.value)
                console.log(key);
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <Button variant="contained" color="primary" type="submit">
              <Link to={{
                pathname: "/search/"+key,
                state: {key: key} 
              }} style={{color: '#FFF'}}>
                Chercher
              </Link>
            </Button>
          </div>
          <div className="menuRight">
            {Id_User <= 0 && <Button><Link to="/login" style={{color: '#FFF'}}>Connexion</Link></Button> }
            {Id_User > 0 && <Button><Link to="/profil" style={{color: '#FFF'}}>Profil</Link></Button> }
            {Id_User > 0 && <Button onClick={logout}><Link to="/" style={{color: '#FFF'}}>Déconnexion</Link></Button> }
            </div>
          </Toolbar>
        </AppBar>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
            <Home />
            </Route>
            <Route path="/search/:key">
              <SearchListPage search={key}/>
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
            <Route path="/profil">
              <Profil />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/forgotpassword">
              <ForgotPassword />
            </Route>
{/*             <Route path="/home">
              <Home />
            </Route> */}
            <PrivateRoute exact path="/admin/blog" component={ListBlog} />
            <PrivateRoute path="/admin/blog/:id/edit" component={EditBlog} />
            <PrivateRoute path="/admin/blog/create" component={CreateBlog} />
          </Switch>
      </Router>
  );
}

export default App;
