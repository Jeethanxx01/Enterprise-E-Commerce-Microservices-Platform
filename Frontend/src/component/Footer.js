import React from "react";
import { GiFruitBowl } from "react-icons/gi";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-light">
      <div className="container py-5">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <GiFruitBowl className="text-warning me-2" style={{ fontSize: "2rem" }} />
              <h4 className="text-warning mb-0">Bites India</h4>
            </div>
            <p className="text-muted mb-4">
              Premium dry fruits, nuts, and healthy snacks delivered to your doorstep. Quality and freshness guaranteed.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-5">
                <FaFacebook />
              </a>
              <a href="#" className="text-light fs-5">
                <FaTwitter />
              </a>
              <a href="#" className="text-light fs-5">
                <FaInstagram />
              </a>
              <a href="#" className="text-light fs-5">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-warning mb-4">Customer Service</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/help" className="text-muted text-decoration-none hover-light">
                  Help Center
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/returns" className="text-muted text-decoration-none hover-light">
                  Returns & Refunds
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/shipping" className="text-muted text-decoration-none hover-light">
                  Shipping Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-muted text-decoration-none hover-light">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-warning mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/about" className="text-muted text-decoration-none hover-light">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="text-muted text-decoration-none hover-light">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-muted text-decoration-none hover-light">
                  Terms & Conditions
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="text-muted text-decoration-none hover-light">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-warning mb-4">Payment Methods</h5>
            <div className="d-flex flex-wrap gap-3 mb-4">
              <div className="bg-white p-2 rounded">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" 
                  alt="Visa" 
                  style={{ height: "24px" }}
                />
              </div>
              <div className="bg-white p-2 rounded">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                  alt="MasterCard" 
                  style={{ height: "24px" }}
                />
              </div>
              <div className="bg-white p-2 rounded">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                  alt="PayPal" 
                  style={{ height: "24px" }}
                />
              </div>
            </div>
            <div className="mt-4">
              <h5 className="text-warning mb-3">Newsletter</h5>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control bg-dark text-light border-secondary" 
                  placeholder="Enter your email"
                />
                <button className="btn btn-warning" type="button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-secondary" />

        {/* Copyright Section */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-muted mb-0">
              &copy; {new Date().getFullYear()} Bites India. All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="text-muted mb-0">
              Made in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
