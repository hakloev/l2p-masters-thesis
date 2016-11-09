import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { actions } from '../data/issue';
import Banner from './Banner';

const textArea = field =>
  <textarea id={field.name} className="materialize-textarea" {...field.input} />;

export const ReportForm = ({ handleSubmit, onSubmitClick }) =>
  <form onSubmit={handleSubmit(onSubmitClick)}>
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
    <button type="submit" className="btn waves-effect waves-light deep-orange">Submit</button>
  </form>;

ReportForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
};

let Report = props => {

  const onSubmitClick = fields => {
    props.onSubmitReport(fields);
  };

  return (
    <div>
      <Banner title="report an issue" />
      <div className="container report-issue-container">
        <div className="row">
          <div className="col s12">
            <ReportForm handleSubmit={props.handleSubmit} onSubmitClick={onSubmitClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

Report.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmitReport: PropTypes.func.isRequired,
};

Report = reduxForm({
  form: 'report',
})(Report);

const mapDispatchToProps = dispatch => {
  return {
    onSubmitReport: formData => {
      dispatch(actions.reportIssue(formData));
    },
  };
};

export default connect(null, mapDispatchToProps)(Report);
