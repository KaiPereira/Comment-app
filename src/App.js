import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AddComments from "./components/AddComments";
import React from "react"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <AddComments />
        </Route> 
      </Switch>
    </Router>
  );
}

export default App;
