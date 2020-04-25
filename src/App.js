import React from "react";
import "./globalStyles.css";
import { Route, Switch } from "react-router-dom";
// components
import UserPage from "./pages/user-page/UserPage";
import PlacePage from "./pages/place-page/PlacePage";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={UserPage} />
        <Route exact path="/place" component={PlacePage} />
      </Switch>
    </div>
  );
}

export default App;
