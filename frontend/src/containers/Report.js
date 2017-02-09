import React, { PropTypes } from 'react';
import { submit } from 'redux-form';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

import ReportForm from '../components/ReportForm';
import Banner from '../components/Banner';

import { actions } from '../data/issue';

const styles = {
  container: {
    margin: '30px auto',
    width: '80%',
  },
  submitButton: {
    marginTop: 10,
  },
};

class Report extends React.Component {

  onSubmit = () => {
    this.props.handleFormSubmit('report');
  }

  handleSubmit = fields => {
    this.props.submitReport(fields);
  }

  render() {
    return (
      <div>
        <Banner title="report an issue" />
        <div style={styles.container}>
          <ReportForm
            form="report"
            onSubmit={this.handleSubmit}
          />
          <RaisedButton
            label="Submit"
            primary
            onTouchTap={this.onSubmit}
            style={styles.submitButton}
          />
        </div>
      </div>
    );
  }
}

Report.propTypes = {
  submitReport: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    submitReport: formData => {
      dispatch(actions.reportIssue(formData));
    },
    handleFormSubmit: identifier => dispatch(submit(identifier)),
  };
};

export default connect(null, mapDispatchToProps)(Report);
