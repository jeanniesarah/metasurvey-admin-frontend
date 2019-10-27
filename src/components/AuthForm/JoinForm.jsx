import React, { Component } from 'react';
import { Button, Form, Icon, Input } from 'antd';
import './JoinForm.css';
import { Link, Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';
import './AuthForm.css';
import './AuthFormHeader.css';
import AuthFormHeader from './AuthFormHeader';
import axios from 'axios';
import { setAccessTokenCookie } from 'helpers/accessTokenCookie';
import { openNotification } from '../../helpers/openNotification';
import { REGISTER } from 'lib/auth';

// interface Props {
//     auth: any,
//     form: any,

//     toggleAccessTokenIsValid: any,
//     saveAccessTokenInState: any
//     accessTokenToggleServerResponded: any,
//     registrationToggleWaitingForServer: any,

//     registrationToggleInvalidEmail: any,
//     registrationToggleInvalidPassword: any,
//     registrationToggleInvalidPasswordRepeat: any,

//     registrationSetEmailMessage: any,
//     registrationSetPasswordMessage: any,
//     registrationSetPasswordRepeatMessage: any,
//     validateUserAccessTokenInAuth: any
// }

class JoinForm extends Component<Props> {
  componentWillMount() {}

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && values.password1 === values.password2) {
        const { email, password1 } = values;

        axios
          .post(REGISTER, { email, password: password1 })
          .then(response => {
            // handle success
            console.log(response);
            let accessToken = response.data.key;

            // Django returns the access token.
            setAccessTokenCookie(accessToken);

            openNotification(
              'Welcome! 🦄',
              'Now please confirm your email (check the spam folder).',
              'OK',
              'success',
              30
            );
          })
          .catch(error => {
            // handle error
            try {
              let errorData = error.response.data;
            } catch (e) {
              openNotification(
                'Server error',
                'Server error',
                'OK',
                'error'
              );
            }
          });
      } else {
        openNotification(
          'Server error',
          'Server error',
          'OK',
          'error'
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <AuthForm>
        <div className="login-form">
          <Form
            onSubmit={this.handleSubmit}
            className="login-form__form"
          >
            <AuthFormHeader
              title="Register"
              subtitle="No credit card required"
            >
              <Icon
                type="lock"
                title="Secure form"
                style={{ opacity: 0.5 }}
              />
            </AuthFormHeader>

            <Form.Item style={{ marginBottom: '40px' }}>
              {getFieldDecorator('email', {})(
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
            <Form.Item>
              {getFieldDecorator('password1', {})(
                <Input
                  name="password1"
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
              {getFieldDecorator('password2', {})(
                <Input
                  name="password2"
                  required={true}
                  prefix={
                    <Icon
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  type="password"
                  placeholder="Repeat password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                size="large"
                icon="fire"
                type="primary"
                htmlType="submit"
                className="login-form__button"
              >
                Create an account
              </Button>
            </Form.Item>
          </Form>
          <Link to="/auth/login" className="join-form__bottom_button">
            <Button
              type="default"
              htmlType="button"
              className=""
              onClick={() => {}}
            >
              Login
            </Button>
          </Link>
        </div>
      </AuthForm>
    );
  }
}

export default Form.create({})(JoinForm);
