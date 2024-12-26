import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'd-block' : 'd-none d-md-block'}`} style={{ backgroundColor: '#343a40', color: 'white', minHeight: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center p-3">
          <h4 className="text-white">My App</h4>
          <button
            className="btn btn-outline-light d-md-none"
            onClick={toggleSidebar}
          >
            <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`} />
          </button>
        </div>
        
        {/* Sidebar Links */}
        <ul className="nav flex-column p-3">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/upload" className="nav-link text-white">Upload</Link>
          </li>
        </ul>
      </aside>

      {/* Button to open sidebar on small screens */}
      {!isOpen && (
        <div className="d-md-none position-fixed top-0 start-0 p-3">
          <Button variant="primary" onClick={toggleSidebar}>
            <i className="bi bi-list" /> Open Sidebar
          </Button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
