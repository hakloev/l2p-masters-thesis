import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const styles = {
  metaRow: {
    display: 'flex',
  },
  name: {
    width: '50%',
  },
  email: {
    marginLeft: 20,
    width: '50%',
  },
};

class ReportForm extends React.Component {

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
      >
        <div style={styles.metaRow}>
          <Field
            name="name"
            component={TextField}
            floatingLabelText="Your Name (Optional):"
            style={styles.name}
          />
          <Field
            name="email"
            component={TextField}
            type="email"
            floatingLabelText="Email address:"
            style={styles.email}
          />
        </div>
        <div>
          <Field
            name="issue"
            component={TextField}
            floatingLabelText="Describe the issue:"
            fullWidth
            multiLine
          />
        </div>
      </form>
    );
  }
}

ReportForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

ReportForm = reduxForm({
  form: 'report',
})(ReportForm);

export default ReportForm;
