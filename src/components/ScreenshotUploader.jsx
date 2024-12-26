import React, { useState } from 'react';
import ScreenshotUploader from '../components/ScreenshotUploader';
import { generateScreenshotId } from '../utils/screenshotHelper';

function Upload({ onAddScreenshot }) {
  const handleUpload = (file) => {
    const newScreenshot = {
      id: generateScreenshotId(),
      name: file.name,
      url: URL.createObjectURL(file),
    };
    onAddScreenshot(newScreenshot);
  };

  return (
    <div className="upload-page">
      <h2>Upload Screenshot</h2>
      <ScreenshotUploader onUpload={handleUpload} />
    </div>
  );
}

export default Upload;
