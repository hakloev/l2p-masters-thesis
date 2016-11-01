import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../actions/reportIssue';


const textArea = field => <textarea id={field.name} className="materialize-textarea" {...field.input}></textarea>;

const onSubmitReport = (formData, dispatch) => {
  dispatch(actions.reportIssue(formData, true));
};

let ReportModal = props => {

  const onSubmitClick = fields => {
    fields['assignmentId'] = props.assignmentId;
    onSubmitReport(fields, props.dispatch);
  };

  return (
    <div id="report-modal" className="modal">
      <div className="modal-content">
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
          <button type="submit" className="btn waves-effect waves-light blue darken-4 modal-close">Submit</button>
        </form>
      </div>
    </div>
  );
};

const open = () => {
  $('#report-modal').openModal();
};

/*
ReportModal.propTypes = {
  assignmentId: PropTypes.number.isRequired,
};
*/

ReportModal = reduxForm({
  form: 'reportModal',
})(ReportModal);

export {
  open,
};

export default connect()(ReportModal);
