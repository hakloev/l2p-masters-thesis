import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import ReportForm from './ReportForm';
import { actions as issueActions } from '../data/issue';
import { actions } from '../data/modals';

class ReportModal extends React.Component {

  onSubmit = () => {
    this.props.handleFormSubmit('report-modal');
  }

  handleSubmit = fields => {
    /* eslint-disable no-param-reassign */
    fields.assignmentId = this.props.assignmentId;
    this.props.submitReport(fields);
  };

  render() {
    const modalActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.toggleModal}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.onSubmit}
      />,
    ];

    return (
      <Dialog
        title={this.props.assignmentId ?
          `Report an issue with assignment ${this.props.assignmentId}`
          :
          'Report an Issue'
          }
        actions={modalActions}
        open={this.props.open}
        onRequestClose={this.props.toggleModal}
      >
        <ReportForm
          form="report-modal"
          onSubmit={this.handleSubmit}
        />
      </Dialog>
    );
  }
}

ReportModal.propTypes = {
  assignmentId: PropTypes.number,
  open: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};


const mapStateToProps = state => {
  return {
    open: state.modals.reportModalOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitReport: formData => {
      dispatch(issueActions.reportIssue(formData, true)); // (payload, isAssignmentForm)
    },
    toggleModal: () => {
      dispatch(actions.toggleReportModal());
    },
    handleFormSubmit: identifier => dispatch(submit(identifier)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportModal);
