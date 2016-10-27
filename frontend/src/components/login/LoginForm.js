import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

// eslint-disable-next-line
const renderField = field =>
  <div>
    <input type={field.type} {...field.input} />
    <label htmlFor={field.label}>{field.label}</label>
  </div>;

const LoginForm = props => {
  // eslint-disable-next-line
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="row">
        <div className="input-field col s12">
          <Field name="username" type="text" label="Username" component={renderField} />
        </div>
        <div className="input-field col s12">
          <Field name="password" type="password" label="Password" component={renderField} />
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <button type="submit" className="btn waves-effect waves-light blue darken-4">Log in</button>
        </div>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'login',
})(LoginForm);
