import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import * as actions from '../actions/auth';

const Register = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h1>Register</h1>
          <RegisterForm onSubmit={props.onLoginClick} />
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  onLoginClick: PropTypes.func.isRequired, // TODO: onLoginClick => onRegistrationClick
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginClick: formData => {
      console.log(formData);
      dispatch(actions.registrationRequest(formData));
    },
  };
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
