import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';
import { TextField, Checkbox } from 'redux-form-material-ui';

const styles = {
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
  },
  passwordField: {
    marginRight: 40,
  },
  submitButton: {
    marginTop: 10,
  },
};

const validate = values => {
  const errors = {};
  if (values.password !== values['password-verify']) {
    errors['password-verify'] = 'Passwords must match';
  }
  return errors;
};

class RegisterForm extends React.Component {

  render() {
    const { handleSubmit, onSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={styles.columnContainer}>
          <Field
            name="username"
            component={TextField}
            type="text"
            floatingLabelText="Username"
            fullWidth
          />
          <Field
            name="email"
            component={TextField}
            type="email"
            floatingLabelText="Email"
            fullWidth
          />
        </div>
        <div style={styles.rowContainer}>
          <Field
            name="password"
            component={TextField}
            type="password"
            floatingLabelText="Password"
            fullWidth
            style={styles.passwordField}
          />
          <Field
            name="password-verify"
            component={TextField}
            type="password"
            floatingLabelText="Verify Password"
            fullWidth
          />
        </div>
        <div>
          <Field
            name="attendSurvey"
            component={Checkbox}
            label="This software is being used for research purposes related to a masters thesis regarding learning how to program. I agree to being sent a short survey about the usage of the software after the final examination in TDT4110."
          />
        </div>
        <RaisedButton
          label="Register"
          primary
          onTouchTap={handleSubmit(onSubmit)}
          style={styles.submitButton}
        />
      </form>
    );
  }
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'register',
  initialValues: { attendSurvey: true }, // Default survey to
  validate,
})(RegisterForm);
