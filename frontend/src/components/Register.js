import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import Banner from './Banner';
import { actions } from '../data/auth';

const Register = props => {
  return (
    <div>
      <Banner title="register" />
      <div className="container register-container">
        <div className="row">
          <div className="col s12">
            <RegisterForm onSubmit={props.onLoginClick} />
          </div>
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
      dispatch(actions.registrationRequest(formData));
    },
  };
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
