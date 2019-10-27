import React, { Component } from 'react';
import { Button, Checkbox, Form, Icon, Input } from 'antd';
import './LoginForm.css';
import '../../data/urls';
import { Link, Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';
import './AuthForm.css';
import './AuthFormHeader.css';
import AuthFormHeader from './AuthFormHeader';
import { string } from 'prop-types';
import setInputStatus from '../../helpers/setInputStatus';
import axios from 'axios';
import { api } from '../../data/urls';
import objectToFormData from '../../helpers/objectToFormData';
import { setAccessTokenCookie } from '../../helpers/auth/accessTokenCookie';
import { openNotification } from '../../helpers/openNotification';
import { messages } from '../../data/messages';

// interface Props {
//     auth: any,
//     form: any,
//     saveAccessTokenInState: any,
//     toggleAccessTokenIsValid: any,
//     accessTokenToggleServerResponded: any,
//     loginToggleWaitingForServer: any,

//     loginToggleInvalidEmail: any,
//     loginToggleInvalidPassword: any,

//     loginSetEmailMessage: any,
//     loginSetPasswordMessage: any,
//     validateUserAccessTokenInAuth: any
// }

class LoginForm extends Component {
  componentWillMount() {
    this.props.validateUserAccessTokenInAuth();
  }

  clearFieldsMessages() {
    this.props.loginToggleInvalidEmail(false);
    this.props.loginToggleInvalidPassword(false);

    this.props.loginSetEmailMessage(undefined);
    this.props.loginSetPasswordMessage(undefined);
  }

  handleSubmit = e => {
    e.preventDefault();

    // When submit the form - all red fields are back to normal.
    // When submit the form - all error messages are cleared.
    this.clearFieldsMessages();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.loginToggleWaitingForServer(true);
        axios
          .post(api.auth.login, objectToFormData(values))
          .then(response => {
            // handle success
            // Django returns the access token.
            let accessToken = response.data.key;

            // We save the token in a Cookie to save the user session. When a user enter the app, we check this cookie. If the cookie valid - we fetch a user data and display it. If the cookie is invalid - we erase it and require to login/sign up.
            setAccessTokenCookie(accessToken);

            // After the token is in cookies, we can save the token in the state for further requests authorization.
            // IMPORTANT: save the token in cookies before changing the token validation process state because you may redirect user to the dashboard with non-set cookie and it will result in redirect back to login page and loop.
            this.props.saveAccessTokenInState(accessToken);

            // Since we just received a fresh token from the server, no need to validate it. We are sure it's valid.
            // We should keep in store that the token is valid.
            this.props.toggleAccessTokenIsValid(true);
            // this.props.accessTokenToggleServerResponded(true);
          })
          .catch(error => {
            // handle error
            try {
              let errorData = error.response.data;

              if (errorData.email !== undefined) {
                let message = errorData.email.join(' ');
                this.props.loginSetEmailMessage(message);
                this.props.loginToggleInvalidEmail(true);
              }

              if (errorData.password !== undefined) {
                let message = errorData.password.join(' ');
                this.props.loginSetPasswordMessage(message);
                this.props.loginToggleInvalidPassword(true);
              }

              if (errorData.non_field_errors !== undefined) {
                // Usually "Unable to log in with provided credentials."
                let message = errorData.non_field_errors.join(' ');

                this.props.loginSetEmailMessage(message);
                this.props.loginToggleInvalidEmail(true);

                this.props.loginSetPasswordMessage(message);
                this.props.loginToggleInvalidPassword(true);
              }
            } catch (e) {
              openNotification(
                'Server error',
                messages.errors.other.serverUnavailable,
                'OK',
                'error'
              );
            }
          })
          .then(response => {
            // always executed
            this.props.loginToggleWaitingForServer(false);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    if (
      this.props.auth.accessTokenValidated === true &&
      this.props.auth.isAccessTokenValid === true
    ) {
      return <Redirect to="/" />;
    }

    return (
      <AuthForm>
        {/*<ValidateUser auth={this.props.auth}*/}
        {/*toggleAccessTokenIsValid={this.props.toggleAccessTokenIsValid}*/}
        {/*saveAccessTokenInState={this.props.saveAccessTokenInState}*/}
        {/*redirectToHome={true}*/}
        {/*redirectToLogin={false}*/}
        {/*accessTokenToggleServerResponded={this.props.accessTokenToggleServerResponded}*/}
        {/*/>*/}
        <div className="login-form">
          <Form
            onSubmit={this.handleSubmit}
            className="login-form__form"
          >
            <AuthFormHeader title="Sign in">
              <Link
                className="login-form__forgot"
                to="/auth/restore-pass"
                onClick={() => {
                  this.clearFieldsMessages();
                }}
              >
                Forgot password?
              </Link>
            </AuthFormHeader>

            <Form.Item
              validateStatus={setInputStatus(
                this.props.auth.login.isInvalidEmail
              )}
              help={this.props.auth.login.emailMessage}
            >
              {getFieldDecorator('email', {
                // rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input
                  name="email"
                  id="email"
                  required={true}
                  allowClear={true}
                  prefix={
                    <Icon
                      type="mail"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  placeholder="Email"
                  type="email"
                />
              )}
            </Form.Item>
            <Form.Item
              validateStatus={setInputStatus(
                this.props.auth.login.isInvalidPassword
              )}
              help={this.props.auth.login.passwordMessage}
            >
              {getFieldDecorator('password', {
                // rules: [{ required: true, message: 'Please input your password!' }],
              })(
                <Input
                  name="password"
                  id="password"
                  required={true}
                  prefix={
                    <Icon
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {/*{getFieldDecorator('remember', {*/}
              {/*valuePropName: 'checked',*/}
              {/*initialValue: true,*/}
              {/*})(*/}
              {/*<Checkbox>Remember me</Checkbox>*/}
              {/*)}*/}
              <Button
                size="large"
                icon="login"
                type="primary"
                loading={this.props.auth.login.isWaitingForServer}
                htmlType="submit"
                className="login-form__button"
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
          <Link to="/auth/join" className="login-form__bottom_button">
            <Button
              type="default"
              htmlType="button"
              className=""
              onClick={() => {
                this.clearFieldsMessages();
              }}
            >
              Register for free
            </Button>
          </Link>
        </div>
      </AuthForm>
    );
  }
}

export default Form.create({})(LoginForm);
