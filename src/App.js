import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Editor from './pages/Editor';

function App() {
  const [screenshots, setScreenshots] = useState([]);
  const [categories, setCategories] = useState([]); // Initialize categories as an empty array
  const navigate = useNavigate();

  useEffect(() => {
    const savedScreenshots = JSON.parse(localStorage.getItem('screenshots')) || [];
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setScreenshots(savedScreenshots);
    setCategories(savedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('screenshots', JSON.stringify(screenshots));
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [screenshots, categories]);

  const addScreenshot = (screenshot) => {
    setScreenshots((prev) => [...prev, screenshot]);
    navigate('/');
  };

  const addCategory = (category) => {
    if (category && !categories.includes(category)) {
      setCategories((prev) => [...prev, category]);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar categories={categories} />
        <Routes>
          <Route
            path="/"
            element={<Dashboard screenshots={screenshots} setScreenshots={setScreenshots} categories={categories} setCategories={setCategories} />}
          />
          <Route
            path="/upload"
            element={<Upload onAddScreenshot={addScreenshot} categories={categories} addCategory={addCategory} />}
          />
          <Route
            path="/editor/:id"
            element={<Editor screenshots={screenshots} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
