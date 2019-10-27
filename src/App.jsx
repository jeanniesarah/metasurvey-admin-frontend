import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Link
} from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import SurveysList from "./components/SurveysList";
import SurveyEdit from "./components/SurveyEdit";

function App() {
  return (
    <Router>
      <h1>MetaSurvey</h1>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin/surveys">
          <SurveysList />
        </Route>
        <Route path="/admin/survey/:id">
          <SurveyEdit />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
