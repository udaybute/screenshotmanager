import React from 'react';
import { useParams } from 'react-router-dom';
import ScreenshotEditor from '../components/ScreenshotEditor';

function Editor({ screenshots }) {
  const { id } = useParams();
  const screenshot = screenshots.find((s) => s.id === id);

  if (!screenshot) {
    return <p>Screenshot not found!</p>;
  }

  return (
    <div className="editor-page">
      <ScreenshotEditor screenshot={screenshot} />
    </div>
  );
}

export default Editor;
