import React from 'react';

function ScreenshotList({ screenshots }) {
  return (
    <div className="screenshot-list">
      {screenshots.map((screenshot) => (
        <div key={screenshot.id} className="screenshot-item">
          <img src={screenshot.url} alt={screenshot.name} />
          <p>{screenshot.name}</p>
        </div>
      ))}
    </div>
  );
}

export default ScreenshotList;
