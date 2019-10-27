import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import 'antd/dist/antd.css';
import SurveysList from './components/SurveysList';
import SurveyEdit from './components/SurveyEdit';
import ConfirmEmail from './components/ConfirmEmail';
import JoinForm from 'components/AuthForm/JoinForm';
import LoginForm from 'components/AuthForm/LoginForm';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { validateToken } from 'lib/api';

function App() {
  const isTokenValid = validateToken();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/admin/surveys" />
        </Route>
        <Route path="/admin/surveys">
          <SurveysList />
        </Route>
        <Route path="/admin/survey/:id">
          <SurveyEdit />
        </Route>
        <Route
          path="/confirm-email"
          render={() =>
            isTokenValid ? <ConfirmEmail /> : <Redirect to="/login" />
          }
        >
          <ConfirmEmail />
        </Route>
        <Route path="/signup" render={props => <JoinForm />} />
        <Route
          exact
          path={`/login`}
          render={props => <LoginForm />}
        />
      </Switch>
    </Router>
  );
}

export default App;
