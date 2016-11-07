import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ReportForm } from './Report';
import * as actions from '../actions/issue';

const open = () => {
  $('#report-modal').openModal();
};

const close = () => {
  $('#report-modal').closeModal();
};

let ReportModal = props => {

  const onSubmitClick = fields => {
    /* eslint-disable no-param-reassign */
    fields.assignmentId = props.assignmentId;
    props.onSubmitReport(fields);
  };

  return (
    <div id="report-modal" className="modal">
      <div className="modal-content">
        <ReportForm handleSubmit={props.handleSubmit} onSubmitClick={onSubmitClick} />
      </div>
    </div>
  );
};

ReportModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  assignmentId: PropTypes.number,
  onSubmitReport: PropTypes.func.isRequired,
};

ReportModal = reduxForm({
  form: 'reportModal',
})(ReportModal);

export {
  open,
  close,
};

const mapStateToProps = state => {
  return {
    assignmentId: state.assignment.task.meta.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitReport: formData => {
      dispatch(actions.reportIssue(formData, true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportModal);
