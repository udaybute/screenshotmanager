import React from 'react';
import { useParams } from 'react-router-dom';

function Editor() {
  const { id } = useParams();
  return (
    <div className="editor-page">
      <h2>Editing Screenshot {id}</h2>
    </div>
  );
}

export default Editor;