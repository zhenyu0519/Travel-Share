import React, { useState, useCallback, useEffect, Suspense } from "react";
import "./globalStyles.css";
import { Route, Switch, Redirect } from "react-router-dom";
// components
// import UserPage from "./pages/user-page/UserPage";
// import UserPlacePage from "./pages/user-place-page/UserPlacePage";
// import PlacePage from "./pages/place-page/PlacePage";
// import UpdatePlacePage from "./pages/update-place-page/UpdatePlacePage";
// import Auth from "./pages/auth-page/Auth";
import { Header } from "./components/header/Header";
import { AuthContext } from "./components/context/Context";
import { LoadingSpinner } from "./components/loading-spinner/LoadingSpinner";

const UserPage = React.lazy(() => import("./pages/user-page/UserPage"));
const UserPlacePage = React.lazy(() =>
  import("./pages/user-place-page/UserPlacePage")
);
const PlacePage = React.lazy(() => import("./pages/place-page/PlacePage"));
const UpdatePlacePage = React.lazy(() =>
  import("./pages/update-place-page/UpdatePlacePage")
);
const Auth = React.lazy(() => import("./pages/auth-page/Auth"));

// set logout timer
let logoutTimer;

function App() {
  // manage states
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationTime, setTokenExpirationTime] = useState();

  // define login function here and put it into context to share to auth component
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

  // refresh page will keep login
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

  // define logout function here and put it into context to share with other components
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
          <Suspense fallback={<LoadingSpinner />}>
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
          </Suspense>
        </Switch>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
