import React from "react";
import "./globalStyles.css";
import { Route, Switch } from "react-router-dom";
// components
import UserPage from "./pages/user-page/UserPage";
import UserPlacePage from "./pages/user-place-page/UserPlacePage";
import PlacePage from "./pages/place-page/PlacePage";
import Header from "./components/header/Header";
import UpdatePlacePage from "./pages/update-place-page/UpdatePlacePage";
import Auth from "./pages/auth-page/Auth";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={UserPage} />
        <Route exact path="/places/new" component={PlacePage} />
        <Route exact path="/places/:placeId" component={UpdatePlacePage} />
        <Route exact path="/:userId/places" component={UserPlacePage} />
        <Route exact path="/auth" component={Auth} />
      </Switch>
    </div>
  );
}

export default App;
