import React from 'react';

const JsonDataViewer = ({ data }) => {
  return (
    <pre>
      <code style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
};

export default JsonDataViewer;