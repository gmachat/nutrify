import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// require('dotenv').config()
import { getLoggedInUser, login } from './api/UserAPI';
import {HomePage, NotFoundPage, LoginPage, SignupPage, RecipePage, CreateRecipePage} from './pages/PageIndex'
import {NavBar} from './components/ComponentIndex'

export const UserContext= React.createContext();


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("auth-user") !== 'null') {
        let response = await getLoggedInUser(localStorage.getItem("auth-user"));
        let data = await response.json();
        if (data.username) {
          setIsLoggedIn(true);
          setUser(data);
        }
      }
    }
    if (!user) {
      getUser();
    }
  }, [user])

  const handleLogin = async (evt) => {
    evt.preventDefault();
    let userObject = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    }
    let response = await login(userObject);
    let data = await response.json();
    if (data.token) {
      localStorage.setItem("auth-user", `${data.token}`);
      setIsLoggedIn(true);
      setUser(data.user);
    }
  }

  const handleLogout = () => {
    localStorage.setItem("auth-user", null);
    setIsLoggedIn(false);
    setUser(null);
  }

  const renderLoginPage = () => {
    return (
      <LoginPage
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        user={user}
      />
    )
  }


  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{user, isLoggedIn, 'handleLogout':handleLogout}}>
            <NavBar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" render={renderLoginPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/recipes/new/" component={CreateRecipePage} />
              <Route exact path="/recipes/:recipeId/" component={RecipePage} />
              {/* <Route exact path="/recipes/:user_id/" component={RecipePage} /> */}
              <Route component={NotFoundPage} />
            </Switch>
          </ UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
