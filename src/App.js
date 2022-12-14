import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  state = {
    isLoggedIn: false,
  };

  handleLogin = (bool) => {
    this.setState({ isLoggedIn: bool });
  };

  render() {
    const { state: { isLoggedIn }, handleLogin } = this;
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route exact path="/">
            {isLoggedIn
              ? (<Redirect to="/search" />)
              : (<Login handleLogin={ handleLogin } />)}
          </Route>
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
