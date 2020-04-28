import React, { useState, useCallback } from "react";
import "./globalStyles.css";
import { Route, Switch, Redirect } from "react-router-dom";
// components
import UserPage from "./pages/user-page/UserPage";
import UserPlacePage from "./pages/user-place-page/UserPlacePage";
import PlacePage from "./pages/place-page/PlacePage";
import Header from "./components/header/Header";
import UpdatePlacePage from "./pages/update-place-page/UpdatePlacePage";
import Auth from "./pages/auth-page/Auth";
import { AuthContext } from "./components/context/Context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
      >
        <Header />
        <Switch>
          <Route exact path="/" component={UserPage} />
          <Route
            exact
            path="/places/new"
            render={() =>
              isLoggedIn ? <PlacePage /> : <Redirect to="/auth" />
            }
          />
          <Route
            exact
            path="/places/:placeId"
            render={() =>
              isLoggedIn ? <UpdatePlacePage /> : <Redirect to="/auth" />
            }
          />
          <Route exact path="/:userId/places" component={UserPlacePage} />
          <Route
            exact
            path="/auth"
            render={() => (isLoggedIn ? <Redirect to="/" /> : <Auth />)}
          />
        </Switch>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
