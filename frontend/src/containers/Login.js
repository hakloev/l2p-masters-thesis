import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Banner from '../components/Banner';
import LoginForm from '../components/LoginForm';
import { actions } from '../data/auth';

const styles = {
  container: {
    margin: '30px auto',
    width: 300,
    maxWidth: '100%',
  },
};


class Login extends React.Component {

  render() {
    const { onLoginClick } = this.props;

    return (
      <div>
        <Banner title="sign in to learnpython" />
        <div style={styles.container}>
          <LoginForm
            onSubmit={onLoginClick}
          />
        </div>
      </div>
    );
  }
}

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

export default connect(null, mapDispatchToProps)(Login);
