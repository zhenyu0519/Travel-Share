import React, { useState, useCallback, useEffect } from "react";
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

let logoutTimer;

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationTime, setTokenExpirationTime] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationTime(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedUserData &&
      storedUserData.token &&
      new Date(storedUserData.expiration) > new Date()
    ) {
      login(
        storedUserData.userId,
        storedUserData.token,
        new Date(storedUserData.expiration)
      );
    }
  }, [login]);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationTime(null);
    localStorage.removeItem("userData");
  }, []);

  // for auto log out
  useEffect(() => {
    if (token && tokenExpirationTime) {
      const remainingTime =
        tokenExpirationTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationTime]);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Header />
        <Switch>
          <Route exact path="/" component={UserPage} />
          <Route
            exact
            path="/places/new"
            render={() => (token ? <PlacePage /> : <Redirect to="/auth" />)}
          />
          <Route
            exact
            path="/places/:placeId"
            render={() =>
              token ? <UpdatePlacePage /> : <Redirect to="/auth" />
            }
          />
          <Route exact path="/:userId/places" component={UserPlacePage} />
          <Route
            exact
            path="/auth"
            render={() => (token ? <Redirect to="/" /> : <Auth />)}
          />
        </Switch>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
