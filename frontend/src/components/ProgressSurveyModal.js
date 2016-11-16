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
    <div>
      <label htmlFor="knowledge_from">Hvordan har du tilegnet deg kunnskap igjennom ITGK?</label>
      <Field name="knowledge_from" component={Select}>
        <option value="PEN">Pensumlitteratur</option>
        <option value="ØVI">Øvinger</option>
        <option value="EGN">Programmering utenom øvinger</option>
        <option value="E-L">Tjenester som Codecademy og Project Euler</option>
        <option value="ANN">Annet</option>
      </Field>
    </div>
    <div>
      <label htmlFor="relevance">I hvilken grad synes du denne programvaren er relevant for egenlæring i ITGK, hvor 1 er dårligst og 5 er best?</label>
      <Field name="relevance" component={Range} type="range" min="1" max="5" />
    </div>
    <div>
      <label htmlFor="knowledge_level">Hvordan føler du selv ferdighetsnivået ditt er i ITGK, hvor 1 er dårligst og 5 er best?</label>
      <Field name="knowledge_level" component={Range} type="range" min="1" max="5" />
    </div>
    <div>
      <label htmlFor="comments">Har du andre kommentarer vedrørende bruken av denne programvaren?</label>
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
