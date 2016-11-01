import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

const renderCheckbox = field =>
  <p>
    <input className="filled-in" type="checkbox" id={field.name} {...field.input} />
    <label htmlFor={field.name}>{field.label}</label>
  </p>;

const StartQuizForm = ({ basicAssignments, onSubmit, handleSubmit }) => {

  const onSubmitClick = fields => {
    const types = [];
    const prefix = 'assignment_';
    Object.keys(fields).forEach(key => {
      if (fields[key] && key.indexOf(prefix) === 0) {
        types.push(key.substring(prefix.length));
      }
    });

    const formFields = { assignment_types: types };

    onSubmit(formFields);
  };

  return (
    <div className="row">
      <div className="col s12">
        <h1>Start new quiz</h1>
        <form onSubmit={handleSubmit(onSubmitClick)}>
          <h3> Practice tasks </h3>
          <p>These tasks are meant for practicing certain core aspects of programming</p>
          <p>Select the topics you want to practice:</p>
          {basicAssignments.map((type, i) => {
            const name = `assignment_${type.id}`;
            return (
              <Field key={`cb-${name}_${i}`} name={name} label={type.type_name} component={renderCheckbox} />
            );
          })}
          <button type="submit" className="btn waves-effect waves-light blue darken-4">Start!</button>
        </form>
      </div>
    </div>
  );
};

StartQuizForm.propTypes = {
  basicAssignments: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'startQuiz',
})(StartQuizForm);
