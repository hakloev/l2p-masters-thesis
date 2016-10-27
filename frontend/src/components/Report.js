import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../actions/reportIssue';

const textArea = field => <textarea id={field.name} className="materialize-textarea" {...field.input}></textarea>;

const onSubmitReport = (formData, dispatch) => {
  console.log(formData)
  dispatch(actions.reportIssue(formData));
};

let Report = props => {

  const onSubmitClick = fields => {
    onSubmitReport(fields, props.dispatch);
  };

  return (
    <div>
      <form onSubmit={props.handleSubmit(onSubmitClick)}>
        <div>
          <label htmlFor="name">Your Name (Optional): </label>
          <Field name="name" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="email"> Email address: </label>
          <Field name="email" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="issue"> Describe the issue: </label>
          <Field name="issue" component={textArea} type="textarea" />
        </div>
        <button type="submit" className="btn waves-effect waves-light blue darken-4">Submit</button>
      </form>
    </div>
  );
};

Report = reduxForm({
  form: 'report',
})(Report);

export default connect()(Report);
