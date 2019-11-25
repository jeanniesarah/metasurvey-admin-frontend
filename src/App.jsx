import React, { useState } from 'react';
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

const App = () => {
  const [isTokenValid, setIsTokenValid] = useState(undefined);

  if (isTokenValid === undefined) {
    validateToken()
        .then(setIsTokenValid);

    // TODO loading screen with logo
    return null;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/admin/surveys" />
        </Route>
        <Route
          path="/admin"
          render={() =>
              isTokenValid ? <Admin /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/confirm-email"
          render={() =>
              isTokenValid ? <ConfirmEmail /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/signup"
          render={() =>
            !isTokenValid ? <JoinForm setIsTokenValid={setIsTokenValid} /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path={`/login`}
          render={() =>
            !isTokenValid ? <LoginForm setIsTokenValid={setIsTokenValid} /> : <Redirect to="/" />
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
