import React, { PropTypes, Component } from 'react';
import AceEditor from 'react-ace';
// eslint-disable-next-line
import brace from 'brace';

import 'brace/mode/python';
import 'brace/theme/kuroir';

let editorInstance = null;

class InputEditor extends Component {

  componentDidMount() {
    // this.editor.focus();
    this.editor = this.reactAce.editor;
    editorInstance = this.editor;
    this.editor.focus();
    this.editor.moveCursorTo(0, 0);

    this.editor.commands.addCommand({
      name: 'compileCode',
      bindKey: {
        win: 'Ctrl-Enter',
        mac: 'Command-Enter',
      },
      exec: () => this.props.compileCode(),
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
        // eslint-disable-next-line no-return-assign
        ref={node => this.reactAce = node}
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

export const setEditorFocus = () => {
  if (editorInstance) {
    editorInstance.focus();
  }
};

export default InputEditor;
