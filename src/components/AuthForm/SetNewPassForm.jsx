import React, { Component } from 'react';
import { Button, Checkbox, Form, Icon, Input } from 'antd';
import './SetNewPassForm.css';
import '../../data/urls';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import './AuthForm.css';
import './AuthFormHeader.css';
import AuthFormHeader from './AuthFormHeader';
import setInputStatus from '../../helpers/setInputStatus';
import axios from 'axios';
import { api } from '../../data/urls';
import objectToFormData from '../../helpers/objectToFormData';
import { openNotification } from '../../helpers/openNotification';

// interface Props {
//   auth: any;
//   form: any;

//   setNewPasswordToggleWaitingForServer: any;
//   setNewPasswordToggleInvalidPassword: any;
//   setNewPasswordToggleInvalidPasswordRepeat: any;
//   setNewPasswordSetPasswordMessage: any;
//   setNewPasswordSetPasswordRepeatMessage: any;
// }

class SetNewPassForm extends Component {
  clearFieldsMessages() {
    this.props.setNewPasswordToggleWaitingForServer(false);
    this.props.setNewPasswordToggleInvalidPassword(false);
    this.props.setNewPasswordToggleInvalidPasswordRepeat(false);
    this.props.setNewPasswordSetPasswordMessage(undefined);
    this.props.setNewPasswordSetPasswordRepeatMessage(undefined);
  }
  handleSubmit = e => {
    e.preventDefault();

    this.clearFieldsMessages();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // also in the POST request send uid and token.
        // but first, get them from the URL:
        let resetPassDataArray = window.location.pathname
          .split('/auth/reset/')[1]
          .split('/');
        let uid = resetPassDataArray[0];
        let token = resetPassDataArray[1];

        let valuesToServer = { ...values, uid: uid, token: token };

        this.props.setNewPasswordToggleWaitingForServer(true);

        axios
          .post(
            api.auth.setNewPasswordAfterReset,
            objectToFormData(valuesToServer)
          )
          .then(response => {
            // handle success

            // console.log(response.data);

            openNotification(
              'Success!',
              'New password has been set. Now you can go back to the login screen and use the new password.',
              'Close',
              'success',
              0
            );
          })
          .catch(error => {
            // handle error

            // console.log(error.response);

            let errorData = error.response.data;

            if (errorData.new_password1 !== undefined) {
              let message = errorData.new_password1.join(' ');
              this.props.setNewPasswordSetPasswordMessage(message);
              this.props.setNewPasswordToggleInvalidPassword(true);
            }

            if (errorData.new_password2 !== undefined) {
              let message = errorData.new_password2.join(' ');
              this.props.setNewPasswordSetPasswordRepeatMessage(
                message
              );
              this.props.setNewPasswordToggleInvalidPasswordRepeat(
                true
              );
            }

            if (errorData.non_field_errors !== undefined) {
              // Usually "The two password fields didn't match."
              let message = errorData.non_field_errors.join(' ');
              this.props.setNewPasswordSetPasswordMessage(message);
              this.props.setNewPasswordToggleInvalidPassword(true);

              this.props.setNewPasswordSetPasswordRepeatMessage(
                message
              );
              this.props.setNewPasswordToggleInvalidPasswordRepeat(
                true
              );
            }

            if (
              errorData.token !== undefined ||
              errorData.uid !== undefined
            ) {
              openNotification(
                'Error occurred!',
                'New password has not been set. The password change link you used is invalid. Please contact the support team and we will help you. Really sorry for that 😐',
                'Close',
                'error',
                0
              );
            }
          })
          .then(response => {
            // always executed
            this.props.setNewPasswordToggleWaitingForServer(false);
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
            <AuthFormHeader title="Set new password" subtitle="">
              <Icon
                type="lock"
                title="Secure form"
                style={{ opacity: 0.5 }}
              />
            </AuthFormHeader>

            <Form.Item
              validateStatus={setInputStatus(
                this.props.auth.setNewPassword.isInvalidPassword
              )}
              help={this.props.auth.setNewPassword.passwordMessage}
            >
              {getFieldDecorator('new_password1', {
                // rules: [{ required: true, message: 'Please input your password!' }],
              })(
                <Input
                  name="new_password1"
                  required={true}
                  prefix={
                    <Icon
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  type="password"
                  placeholder="Enter new password"
                />
              )}
            </Form.Item>
            <Form.Item
              validateStatus={setInputStatus(
                this.props.auth.setNewPassword.isInvalidPasswordRepeat
              )}
              help={
                this.props.auth.setNewPassword.passwordRepeatMessage
              }
            >
              {getFieldDecorator('new_password2', {
                // rules: [{ required: true, message: 'Please input your password!' }],
              })(
                <Input
                  name="new_password2"
                  required={true}
                  prefix={
                    <Icon
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  type="password"
                  placeholder="Repeat new password"
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
                icon="edit"
                type="primary"
                loading={
                  this.props.auth.setNewPassword.isWaitingForServer
                }
                htmlType="submit"
                className="login-form__button"
              >
                Change password
              </Button>
            </Form.Item>
          </Form>
          <Link
            to="/auth/login"
            className="set-new-pass-form__bottom_button"
          >
            <Button type="default" htmlType="button" className="">
              Back to Login
            </Button>
          </Link>
        </div>
      </AuthForm>
    );
  }
}

export default Form.create({})(SetNewPassForm);
