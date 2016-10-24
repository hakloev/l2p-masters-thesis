import React, { PropTypes } from 'react';
import AceEditor from 'react-ace';
// eslint-disable-next-line
import brace from 'brace';

import 'brace/mode/python';
import 'brace/theme/terminal';

const OutputEditor = ({ code }) => {
  return (
    <AceEditor
      mode="python"
      theme="terminal"
      name="output-editor"
      value={code}
      readOnly
      width="auto"
      height="320px"
      editorProps={{ $blockScrolling: Infinity }}
      setOptions={{ showLineNumbers: false, showGutter: false }}
    />
  );
};

OutputEditor.propTypes = {
  code: PropTypes.string,
};

export default OutputEditor;
