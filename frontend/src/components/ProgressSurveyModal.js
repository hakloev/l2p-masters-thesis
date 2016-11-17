import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { actions } from '../data/survey';

class Select extends Component {

  render() {
    return (
      <div className="input-field">
        <select className="browser-default" {...this.props.input} >
          {this.props.children}
        </select>
      </div>
    );
  }
}

class Range extends Component {

  render() {
    return (
      <p className="range-field">
        <input
          type={this.props.type}
          id={this.props.name}
          min={this.props.min}
          max={this.props.max}
          {...this.props.input}
        />
      </p>
    );
  }
}

const textArea = field =>
  <textarea id={field.name} className="materialize-textarea" {...field.input} />;

let ProgressSurveyForm = ({ handleSubmit, onSubmitForm }) =>
  <form onSubmit={handleSubmit(onSubmitForm)}>
    <h4>We would appreciate if you took two minutes to answer the following questions</h4>
    <div>
      <label htmlFor="knowledge_from">Over the course of this semester, what was you primary way of learning python?</label>
      <Field name="knowledge_from" component={Select}>
        <option value="PEN">Reading course literature</option>
        <option value="ØVI">Mandatory exercises</option>
        <option value="EGN">Programming aside from the mandatory exercises</option>
        <option value="E-L">Services like Codecademy and Project Euler</option>
        <option value="ANN">Other</option>
      </Field>
    </div>
    <div>
      <label htmlFor="relevance">On a scale from 1 to 5, to which degree do you feel this software is relevant to learning python?</label>
      <Field name="relevance" component={Range} type="range" min="1" max="5" />
    </div>
    <div>
      <label htmlFor="knowledge_level">On a scale from 1 to 5, how would you rate your own skill level in programming?</label>
      <Field name="knowledge_level" component={Range} type="range" min="1" max="5" />
    </div>
    <div>
      <label htmlFor="comments">Do you have any other comments related to this software?</label>
      <Field name="comments" component={textArea} type="textarea" />
    </div>
    <button type="submit" className="btn waves-effect waves-light deep-orange">Submit</button>
  </form>;

ProgressSurveyForm = reduxForm({
  form: 'progressSurvey',
  initialValues: {
    knowledge_from: 'PEN',
    relevance: 1,
    knowledge_level: 1,
    comments: '',
  },
})(ProgressSurveyForm);


const ProgressSurveyModal = props => {

  return (
    <div id="progress-survey-modal" className="modal">
      <div className="modal-content">
        <div>
          <h3>Usage survey</h3>
          <p>We would appreciate if you could answer a few questions about the software</p>
        </div>
        <ProgressSurveyForm onSubmitForm={props.onSubmitForm} />
      </div>
    </div>
  );
};

ProgressSurveyModal.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};


const mapStateToProps = state => {
  return {
    assignmentId: state.assignment.task.meta.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitForm: formData => {
      console.log(formData);
      dispatch(actions.postProgressSurvey(formData));
    },
  };
};

export const open = () => {
  $('#progress-survey-modal').modal('open');
};

export const close = () => {
  $('#progress-survey-modal').modal('close');
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressSurveyModal);
