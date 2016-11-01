import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
// eslint-disable-next-line
import brace from 'brace';

import 'brace/mode/python';
import 'brace/theme/kuroir';

class InputEditor extends Component {

  componentDidMount() {
    const editor = ReactDOM.findDOMNode(this);

    editor.addEventListener('keydown', e => {
      // Listen for CMD + Enter or CTRL + Enter
      if ((e.metaKey || e.ctrlKey) && e.keyCode === 13) {
        this.props.compileCode();
      }
    });

  }

  onEditorChange() {
    return newValue => {
      this.props.onChange(newValue);
    };
  }

  render() {
    return (
      <AceEditor
        mode="python"
        theme="kuroir"
        name="input-editor"
        fontSize={14}
        value={this.props.code}
        width="auto"
        height="100%"
        onChange={this.onEditorChange()}
        showPrintMargin={false}
        editorProps={{ $blockScrolling: Infinity }}
      />
    );
  }
}

InputEditor.propTypes = {
  code: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  compileCode: PropTypes.func.isRequired,
};

export default InputEditor;
