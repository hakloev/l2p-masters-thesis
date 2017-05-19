import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Checkbox } from 'redux-form-material-ui';


class StartQuizForm extends React.Component {

  handleKeyDown = (e, callback) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      callback();
    }
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyDown={e => { this.handleKeyDown(e, this.props.handleSubmit); }}
      >
        {this.props.assignmentTypes.map((type, i) => {
          const name = `assignment_${type.id}`;
          return (
            <Field
              key={`cb-${name}_${i}`}
              name={name}
              label={type.type_name}
              component={Checkbox}
            />
          );
        })}
      </form>
    );
  }
}

StartQuizForm.propTypes = {
  assignmentTypes: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'startQuiz',
})(StartQuizForm);
