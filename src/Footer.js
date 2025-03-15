import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer
      className="text-center text-light py-4"
      style={{
        background: "rgba(0, 0, 0, 0.6)", 
        backdropFilter: "blur(8px)", 
        boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="container">
        {/* Footer Links */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <div>
              <a href="#" className="text-light me-3"><i className="bi bi-facebook fs-4"></i></a>
              <a href="#" className="text-light me-3"><i className="bi bi-twitter fs-4"></i></a>
              <a href="#" className="text-light"><i className="bi bi-instagram fs-4"></i></a>
            </div>
          </div>

          {/* Copyright */}
          <div className="col-md-4 mb-3">
            <h5>Contact Info</h5>
            <p>Email: support@expensesplitter.com</p>
            <p>Phone: +91 12345 67890</p>
          </div>
        </div>

        <hr className="border-light" />
        <p className="mb-0">© 2025 Expense Splitter. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
