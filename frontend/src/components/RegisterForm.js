import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};
  if (values.password !== values['password-verify']) {
    errors['password-verify'] = 'Passwords must match';
  }
  return errors;
};

// eslint-disable-next-line
const renderField = field =>
  <div className="input-field col s12">
    <input type={field.type} {...field.input} className="validate" />
    <label htmlFor={field.label} data-error={field.errorMessage && field.errorMessage}>{field.label}</label>
    {/* {field.meta.touched && field.meta.error && <span>{field.meta.error}</span>} */}
  </div>;

const renderCheckbox = field =>
  <p>
    <input className="filled-in" type="checkbox" id={field.name} {...field.input} />
    <label htmlFor={field.name}>{field.label}</label>
  </p>;

const RegisterForm = props => {
  // eslint-disable-next-line
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="row">
        <Field name="username" type="text" label="Username" component={renderField} />
        <Field name="email" type="email" label="Email" component={renderField} />
        <Field name="password" type="password" label="Password" component={renderField} />
        <Field
          name="password-verify"
          type="password"
          label="Verify Password"
          errorMessage="Passwords must match"
          component={renderField}
        />
        <Field name="attendSurvey" type="checkbox" label="Can we send you a survey" component={renderCheckbox} />
      </div>
      <div className="row">
        <div className="col s12">
          <button type="submit" className="btn waves-effect waves-light deep-orange">Register</button>
        </div>
      </div>
    </form>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'register',
  initialValues: { attendSurvey: 'true' }, // Default survey to
  validate,
})(RegisterForm);
