import React, { PropTypes } from 'react';
import AceEditor from 'react-ace';
// eslint-disable-next-line
import brace from 'brace';

import 'brace/mode/python';
import 'brace/theme/kuroir';

const InputEditor = ({ code, onChange }) => {

  const onEditorChange = () => {
    return newValue => {
      onChange(newValue);
    };
  };

  return (
    <AceEditor
      mode="python"
      theme="kuroir"
      name="input-editor"
      fontSize={14}
      value={code}
      width="auto"
      height="100%"
      onChange={onEditorChange()}
      showPrintMargin={false}
      editorProps={{ $blockScrolling: Infinity }}
    />
  );
};

InputEditor.propTypes = {
  code: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default InputEditor;
