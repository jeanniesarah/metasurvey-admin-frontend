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
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';

function App() {
  const isTokenValid = false;

  return (
    <Router>
      <Switch>
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
        {/* <Route
          exact
          path={`${this.props.match.path}/login`}
          render={props => (
            <LoginForm
              auth={this.props.auth}
              toggleAccessTokenIsValid={
                this.props.toggleAccessTokenIsValid
              }
              saveAccessTokenInState={
                this.props.saveAccessTokenInState
              }
              loginToggleWaitingForServer={
                this.props.loginToggleWaitingForServer
              }
              loginToggleInvalidEmail={
                this.props.loginToggleInvalidEmail
              }
              loginToggleInvalidPassword={
                this.props.loginToggleInvalidPassword
              }
              loginSetEmailMessage={this.props.loginSetEmailMessage}
              loginSetPasswordMessage={
                this.props.loginSetPasswordMessage
              }
              accessTokenToggleServerResponded={
                this.props.accessTokenToggleServerResponded
              }
              validateUserAccessTokenInAuth={
                this.props.validateUserAccessTokenInAuth
              }
            />
          )}
        /> */}
        {/* <Redirect to="/404" /> */}
      </Switch>
    </Router>
  );
}

export default App;
