import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';

const styles = {
  submitButton: {
    marginTop: 10,
  },
};

class LoginForm extends React.Component {

  handleKeyDown = (e, callback) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      callback();
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.props.onSubmit)}
        onKeyDown={e => { this.handleKeyDown(e, this.props.handleSubmit); }}
      >
        <div>
          <Field
            name="username"
            component={TextField}
            type="text"
            floatingLabelText="Username"
            fullWidth
          />
          <Field
            name="password"
            component={TextField}
            type="password"
            floatingLabelText="Password"
            fullWidth
          />
        </div>
        <RaisedButton
          label="Sign In"
          primary
          onTouchTap={handleSubmit}
          style={styles.submitButton}
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'login',
})(LoginForm);
