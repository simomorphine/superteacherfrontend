import React from 'react';

function Sidebar() {
  return (
    <div className="d-flex" id="wrapper">
      <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">SuperTeacher Menu </div>
        <div className="list-group list-group-flush">
          <a href="#" className="list-group-item list-group-item-action bg-light">
            Dashboard
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            Plans
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            Evaluations
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            Exams
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            Reports
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
