import React, { Component } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Input,
  notification,
} from 'antd';
import './RestorePassForm.css';
import '../../data/urls';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import './AuthForm.css';
import './AuthFormHeader.css';
import AuthFormHeader from './AuthFormHeader';
import { string } from 'prop-types';
import setInputStatus from '../../helpers/setInputStatus';
import { api, urls } from '../../data/urls';
import axios from 'axios';
import objectToFormData from '../../helpers/objectToFormData';
import { setAccessTokenCookie } from '../../helpers/auth/accessTokenCookie';
import { openNotification } from '../../helpers/openNotification';

// interface Props {
//   auth: any;
//   form: any;
//   user: any;

//   restorePasswordToggleWaitingForServer: any;
//   restorePasswordToggleInvalidAttempt: any;
//   restorePasswordSetServerMessage: any;
// }

class RestorePassForm extends Component {
  clearFieldsMessages() {
    this.props.restorePasswordToggleInvalidAttempt(false);
    this.props.restorePasswordSetServerMessage(undefined);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.clearFieldsMessages();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.restorePasswordToggleWaitingForServer(true);

        axios
          .post(
            api.auth.sendPasswordResetLink,
            objectToFormData(values)
          )
          .then(response => {
            // handle success

            let message =
              response.data.detail +
              ' ' +
              "If you didn't receive a message, double check the entered email and try again.";

            this.props.restorePasswordSetServerMessage(message);

            openNotification(
              'A restore email sent!',
              message,
              'I understand',
              'info',
              0
            );
          })
          .catch(error => {
            // handle error

            // Not sure which format the error.response.data is
            // I suppose it looks like this:: {email: ['Ohh.', 'Error text.'], pass: ['Damn.', 'Bad id.']}
            // So I create a mega string of all props.

            if (error.response === undefined) {
              openNotification(
                'Internal error',
                'A server error occurred. Please contact us.',
                'Close',
                'error',
                0
              );
            } else {
              let errorData = error.response.data;
              let errorMessage = '';
              for (let prop in errorData) {
                let errorItem = errorData[prop];
                errorItem = errorItem.join(' ');

                errorMessage += errorItem;
                errorMessage += ' ';
              }

              this.props.restorePasswordToggleInvalidAttempt(true);
              this.props.restorePasswordSetServerMessage(
                errorMessage
              );
            }
          })
          .then(response => {
            // always executed
            this.props.restorePasswordToggleWaitingForServer(false);
          });
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
            <AuthFormHeader title="Restore password">
              <a
                className="login-form__forgot"
                target="_blank"
                href={`mailto:${urls.contactUsEmail}`}
              >
                Need help?
              </a>
            </AuthFormHeader>

            <Form.Item
              validateStatus={setInputStatus(
                this.props.auth.restorePassword.isInvalidAttempt
              )}
              help={this.props.auth.restorePassword.message}
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
            <Form.Item>
              {/*{getFieldDecorator('remember', {*/}
              {/*valuePropName: 'checked',*/}
              {/*initialValue: true,*/}
              {/*})(*/}
              {/*<Checkbox>Remember me</Checkbox>*/}
              {/*)}*/}
              <Button
                size="large"
                icon="link"
                type="primary"
                loading={
                  this.props.auth.restorePassword.isWaitingForServer
                }
                htmlType="submit"
                className="login-form__button"
              >
                Send reset link
              </Button>
            </Form.Item>
          </Form>
          <Link
            to="/auth/login"
            className="restore-pass-form__bottom_button"
          >
            <Button
              type="default"
              htmlType="button"
              className=""
              onClick={() => {
                this.clearFieldsMessages();
              }}
            >
              Back to login
            </Button>
          </Link>
        </div>
      </AuthForm>
    );
  }
}

export default Form.create({})(RestorePassForm);
