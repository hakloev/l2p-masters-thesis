/**
 * <h3> Exam practice tasks </h3>
 { examAssignments &&
   <Field key={'examAssignments'} name={'examAssignments'} label={examAssignments.type_name} component={renderCheckbox} />
 }
 */
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

const StartExamQuizForm = ({ onSubmit }) => {

  const onSubmitClick = () => {
    onSubmit({ assignment_types: ['4'] });
  };

  return (
    <div className="row">
      <div className="col s12">
        <h3>Exam Questions</h3>
        <p>These tasks are of varying difficulty and are meant as practice prior to the exam.</p>
        <button type="submit" onClick={onSubmitClick} className="btn waves-effect waves-light blue darken-4">Start exam practice</button>
      </div>
    </div>
  );
};

StartExamQuizForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'startQuiz',
})(StartExamQuizForm);
