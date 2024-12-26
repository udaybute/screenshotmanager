import React from 'react';

function ScreenshotViewer({ screenshot }) {
  return (
    <div className="screenshot-viewer">
      <img src={screenshot.url} alt={screenshot.name} />
      <h3>{screenshot.name}</h3>
    </div>
  );
}

export default ScreenshotViewer;
