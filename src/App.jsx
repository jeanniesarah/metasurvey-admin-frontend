import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import 'antd/dist/antd.css';
import ConfirmEmail from './components/ConfirmEmail';
import JoinForm from 'components/AuthForm/JoinForm';
import LoginForm from 'components/AuthForm/LoginForm';
import Admin from 'admin';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { validateToken } from 'lib/api';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/admin/surveys" />
        </Route>
        <Route
          path="/admin"
          render={() =>
              validateToken() ? <Admin /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/confirm-email"
          render={() =>
              validateToken() ? <ConfirmEmail /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/signup"
          render={() =>
            !validateToken() ? <JoinForm /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path={`/login`}
          render={() =>
            !validateToken() ? <LoginForm /> : <Redirect to="/" />
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
