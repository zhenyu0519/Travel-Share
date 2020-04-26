import React from "react";
import "./globalStyles.css";
import { Route, Switch } from "react-router-dom";
// components
import UserPage from "./pages/user-page/UserPage";
import UserPlacePage from "./pages/user-place-page/UserPlacePage";
import PlacePage from "./pages/place-page/PlacePage";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={UserPage} />
        <Route exact path="/places/new" component={PlacePage} />
        <Route exact path="/:userId/places" component={UserPlacePage} />
      </Switch>
    </div>
  );
}

export default App;
