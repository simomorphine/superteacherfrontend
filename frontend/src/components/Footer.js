import React from 'react';

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto py-3">
      <div className="text-center p-2">
        © {new Date().getFullYear()} SuperTeacher. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
