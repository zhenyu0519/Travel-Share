import React from "react";
import "./globalStyles.css";
import { Route, Switch } from "react-router-dom";
import { UserPage } from "./pages/user/UserPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
