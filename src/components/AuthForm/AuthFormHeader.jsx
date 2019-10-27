import React, { Component } from 'react';

interface Props {
  title: string;
  subtitle?: string;
}

class AuthFormHeader extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="auth-form-header">
        <div className="auth-form-header__left">
          <h3 className="auth-form-header__title">
            {this.props.title}
          </h3>
          <span className="auth-form-header__subtitle">
            {this.props.subtitle}
          </span>
        </div>
        <div className="auth-form-header__right">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AuthFormHeader;
