import React, { useState } from 'react';
import ScreenshotList from '../components/ScreenshotList';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import jsPDF from 'jspdf';

function Dashboard({ screenshots, setScreenshots, categories, setCategories }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();

  // Function to delete a screenshot
  const handleDelete = (id) => {
    const updatedScreenshots = screenshots.filter((screenshot) => screenshot.id !== id);
    setScreenshots(updatedScreenshots);
    localStorage.setItem('screenshots', JSON.stringify(updatedScreenshots)); // Persist changes in localStorage
  };

  // Function to export screenshots to PDF with images
  const exportToPDF = () => {
    const doc = new jsPDF();
    let yPosition = 10;

    categories.forEach((category) => {
      const categoryScreenshots = screenshots.filter(
        (screenshot) => screenshot.category === category
      );

      if (categoryScreenshots.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.text(category, 10, yPosition);
        yPosition += 10;

        categoryScreenshots.forEach((screenshot, index) => {
          doc.setFont('helvetica', 'normal');
          doc.text(`Screenshot #${index + 1}`, 10, yPosition);
          yPosition += 10;

          const img = new Image();
          img.src = screenshot.url;
          img.onload = function () {
            doc.addImage(img, 'JPEG', 10, yPosition, 180, 100);
            yPosition += 120;
            if (index === categoryScreenshots.length - 1) {
              doc.save('screenshots.pdf');
            }
          };
        });
      }
    });
  };

  // Function to handle category add
  const handleAddCategory = () => {
    if (categoryName && !categories.includes(categoryName)) {
      setCategories((prev) => [...prev, categoryName]);
      setCategoryName('');
      setShowModal(false);
    }
  };

  // Function to delete category
  const handleDeleteCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  // Filtering screenshots based on category and search term
  const filteredScreenshots = screenshots.filter((screenshot) => {
    const matchesCategory =
      selectedCategory === 'All' || screenshot.category === selectedCategory;
    const matchesSearch =
      screenshot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      screenshot.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* Category filter */}
      <div className="d-flex justify-content-between mb-3">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="form-select"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Button to open modal for adding new category */}
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Category
        </Button>

        {/* Upload button to navigate to the upload page */}
        <Button variant="success" onClick={() => navigate('/upload')}>
          Upload Screenshot
        </Button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or tag"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control my-3"
      />

      {/* Export to PDF button */}
      <Button variant="success" onClick={exportToPDF} className="mb-3">
        Export to PDF
      </Button>

      {/* Modal for adding category */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display filtered screenshots */}
      <div className="row">
        {categories.map((category) => {
          const categoryScreenshots = filteredScreenshots.filter(
            (screenshot) => screenshot.category === category
          );

          return (
            <div key={category} className="col-12 mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <h3>{category}</h3>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteCategory(category)}
                >
                  Delete Category
                </Button>
              </div>
              <div className="row">
                {categoryScreenshots.length > 0 ? (
                  categoryScreenshots.map((screenshot) => (
                    <div key={screenshot.id} className="col-md-4 mb-3">
                      <div className="card">
                        <img
                          src={screenshot.url}
                          alt={screenshot.name}
                          className="card-img-top"
                        />
                        <div className="card-body">
                          <button
                            onClick={() => handleDelete(screenshot.id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No screenshots in this category.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
