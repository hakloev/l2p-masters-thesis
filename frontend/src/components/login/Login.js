import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import * as actions from '../../actions/auth';

const Login = props => {
  return (
    <div className="row">
      <div className="col s12">
        <LoginForm onSubmit={props.onLoginClick} />
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
      dispatch(actions.loginRequest({
        username: formData.username,
        password: formData.password,
      }));
    },
  };
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
