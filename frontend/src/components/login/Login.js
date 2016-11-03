import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import * as actions from '../../actions/auth';

const Login = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h1>Login</h1>
          <LoginForm onSubmit={props.onLoginClick} />
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
      console.log('test');
      console.log(formData);
      dispatch(actions.loginRequest(formData));
    },
  };
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
