import React, { PropTypes } from 'react';
import AceEditor from 'react-ace';
// eslint-disable-next-line
import brace from 'brace';

import 'brace/mode/python';
import 'brace/theme/monokai';

const InputEditor = ({ code, onChange }) => {
  const onEditorChange = () => {
    return newValue => {
      onChange(newValue);
    };
  };

  return (
    <AceEditor
      mode="python"
      theme="monokai"
      name="input-editor"
      value={code}
      width="auto"
      height="320px"
      onChange={onEditorChange()}
      editorProps={{ $blockScrolling: Infinity }}
    />
  );
};

InputEditor.propTypes = {
  code: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default InputEditor;
