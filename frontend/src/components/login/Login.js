import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import Banner from '../Banner';
import { actions } from '../../data/auth';

const Login = props => {
  return (
    <div>
      <Banner title="login" />
      <div className="container login-container">
        <div className="row">
          <div className="col s12">
            <LoginForm onSubmit={props.onLoginClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginClick: formData => {
      dispatch(actions.loginRequest(formData));
    },
  };
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
