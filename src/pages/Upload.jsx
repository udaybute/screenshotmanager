import React, { useState } from 'react';
import { generateScreenshotId } from '../pages/screenshotHelper';

function Upload({ onAddScreenshot, categories, addCategory }) {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState(''); // Input for new category
  const [tags, setTags] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setNewCategory(''); // Reset new category input when a predefined category is selected
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      addCategory(newCategory); // Add the new category
      setCategory(newCategory); // Set it as the selected category
      setNewCategory(''); // Clear new category input
    }
  };

  const handleUpload = () => {
    if (file && category) {
      const newScreenshot = {
        id: generateScreenshotId(),
        name: file.name,
        url: URL.createObjectURL(file),
        category,
        tags: tags.split(',').map((tag) => tag.trim()), // Split tags into an array
        date: new Date().toISOString(), // Add upload date
      };
      onAddScreenshot(newScreenshot);
      setFile(null);
      setTags('');
      setCategory(''); // Clear selected category
    }
  };

  return (
    <div className="upload-page">
      <h2>Upload Screenshot</h2>

      {/* File input */}
      <input type="file" onChange={handleFileChange} />

      {/* Category selection dropdown */}
      <select value={category} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Input for adding a new category */}
      <div className="new-category-input">
        <input
          type="text"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      {/* Tags input */}
      <input
        type="text"
        placeholder="Enter tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      {/* Upload button */}
      <button onClick={handleUpload} disabled={!file || !category}>
        Upload
      </button>
    </div>
  );
}

export default Upload;
