import React, { Component } from 'react';
import { Button, Form, Icon, Input } from 'antd';
import './LoginForm.css';
import { Link, Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';
import './AuthForm.css';
import './AuthFormHeader.css';
import AuthFormHeader from './AuthFormHeader';
import axios from 'axios';
// import { setAccessTokenCookie } from 'helpers/accessTokenCookie';
import { openNotification } from '../../helpers/openNotification';
import { setToken } from 'lib/api';
import { LOGIN } from 'lib/auth';

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
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  clearFieldsMessages() {}

  handleSubmit = setIsTokenValid => e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios
          .post(LOGIN, values)
          .then(response => {
            // handle success
            // Django returns the access token.
            let accessToken = response.data.jwtToken;
            setToken(accessToken);
            setIsTokenValid(true);
          })
          .catch(error => {
            // handle error
            try {
              let errorData = error.response.data;
            } catch (e) {
              openNotification(
                'Server error',
                'Login error',
                'OK',
                'error'
              );
            }
          });
      }
    });
  };

  render() {
    const { setIsTokenValid } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <AuthForm>
        <div className="login-form">
          <Form
            onSubmit={this.handleSubmit(setIsTokenValid)}
            className="login-form__form"
          >
            <AuthFormHeader title="Sign in"></AuthFormHeader>

            <Form.Item>
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
            // validateStatus={setInputStatus(
            //   this.props.auth.login.isInvalidPassword
            // )}
            // help={this.props.auth.login.passwordMessage}
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
                htmlType="submit"
                className="login-form__button"
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
          <Link to="/signup" className="login-form__bottom_button">
            <Button
              type="default"
              htmlType="button"
              className=""
              onClick={() => {}}
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
