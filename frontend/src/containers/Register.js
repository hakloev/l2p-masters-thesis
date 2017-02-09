import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Banner from '../components/Banner';
import RegisterForm from '../components/RegisterForm';
import { actions } from '../data/auth';

const styles = {
  container: {
    width: '80%',
    maxWidth: 600,
    margin: '30px auto',
  },
};

class Register extends React.Component {

  render() {

    return (
      <div>
        <Banner title="register an account" />
        <div style={styles.container}>
          <RegisterForm
            onSubmit={this.props.onLoginClick}
          />
        </div>
      </div>
    );
  }
}

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

export default connect(null, mapDispatchToProps)(Register);
