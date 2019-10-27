import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

interface Props {}

class AuthForm extends Component {
  componentDidMount() {}

  render() {
    return <div className="auth-form">{this.props.children}</div>;
  }
}

export default AuthForm;
