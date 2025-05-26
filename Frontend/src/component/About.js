import React from "react";
import { GiFruitBowl, GiHealthNormal, GiFarmTractor, GiDeliveryDrone } from "react-icons/gi";
import { FaLeaf, FaShieldAlt, FaTruck } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import dryfruitsImage from "../assests/dryfruits.png";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <GiFruitBowl className="text-success me-2" style={{ fontSize: "3rem" }} />
          <h1 className="fw-bold text-success mb-0">About Bites India</h1>
        </div>
        <p className="lead text-muted">Premium Quality Dry Fruits, Delivered to Your Doorstep</p>
      </div>

      {/* Main Content */}
      <div className="row align-items-center g-4 mb-5">
        <div className="col-lg-6">
          <img
            src={dryfruitsImage}
            alt="Premium Dry Fruits"
            className="img-fluid rounded shadow-lg"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
          />
        </div>
        <div className="col-lg-6">
          <div className="bg-light p-4 rounded shadow-sm">
            <h3 className="text-success mb-4">Our Story</h3>
            <p className="text-justify mb-4">
              Welcome to <strong className="text-success">Bites India</strong>, your one-stop destination for premium quality dry fruits and nuts. 
              We are committed to providing you with the freshest and most nutritious products sourced directly 
              from the finest farms and trusted suppliers. Our journey began with a passion for health and wellness, 
              aiming to make natural and wholesome snacking a part of every household.
            </p>
            <p className="text-justify">
              At Bites India, we believe in the power of nature's goodness. Our carefully curated selection of dry fruits, 
              including almonds, cashews, walnuts, pistachios, raisins, and more, are packed with essential nutrients 
              that promote overall well-being. Whether you are looking for a healthy snack, an ingredient for your recipes, 
              or a thoughtful gift, we have something for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-5">
        <h2 className="text-center text-success mb-4">Why Choose Bites India?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <GiHealthNormal className="text-success mb-3" style={{ fontSize: "2.5rem" }} />
                <h5 className="card-title">100% Natural</h5>
                <p className="card-text text-muted">Premium quality dry fruits with no artificial additives</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <GiFarmTractor className="text-success mb-3" style={{ fontSize: "2.5rem" }} />
                <h5 className="card-title">Trusted Sources</h5>
                <p className="card-text text-muted">Sourced from sustainable and certified farms</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <FaLeaf className="text-success mb-3" style={{ fontSize: "2.5rem" }} />
                <h5 className="card-title">No Preservatives</h5>
                <p className="card-text text-muted">Pure and natural products without any preservatives</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <FaShieldAlt className="text-success mb-3" style={{ fontSize: "2.5rem" }} />
                <h5 className="card-title">Secure Packaging</h5>
                <p className="card-text text-muted">Premium packaging to maintain freshness</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <FaTruck className="text-success mb-3" style={{ fontSize: "2.5rem" }} />
                <h5 className="card-title">Fast Delivery</h5>
                <p className="card-text text-muted">Quick and reliable nationwide shipping</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <GiDeliveryDrone className="text-success mb-3" style={{ fontSize: "2.5rem" }} />
                <h5 className="card-title">Customer First</h5>
                <p className="card-text text-muted">Dedicated to your satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="bg-light p-5 rounded shadow-sm mb-5">
        <h2 className="text-center text-success mb-4">Our Mission & Vision</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 border-0">
              <div className="card-body">
                <h4 className="text-success mb-3">Our Mission</h4>
                <p className="text-muted">
                  To promote a healthier lifestyle by offering high-quality, nutrient-rich dry fruits at 
                  competitive prices. We are committed to making natural and wholesome snacking accessible to everyone.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 border-0">
              <div className="card-body">
                <h4 className="text-success mb-3">Our Vision</h4>
                <p className="text-muted">
                  To become a household name in India for premium dry fruits, trusted by customers for our 
                  excellence and authenticity. We aim to be the go-to destination for healthy snacking solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-success mb-4">Join Our Journey</h2>
        <p className="lead text-muted mb-4">
          Experience the taste of purity and health with Bites India. Browse our collection and make a healthy choice today!
        </p>
        <button 
          className="btn btn-success btn-lg px-5 py-3" 
          onClick={() => navigate("/Home")}
          style={{ fontSize: "1.2rem" }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default AboutUs;