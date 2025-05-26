import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { GiFruitBowl } from "react-icons/gi";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaHome, FaClipboardList, FaInfoCircle } from "react-icons/fa";
import axios from "axios";

const Navigation = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5003/cart", {
        headers: { Authorization: `Bearer ${isAuthenticated}` }
      });
      setCartItemCount(response.data.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar 
      expand="lg" 
      className="py-3 shadow-sm"
      style={{ 
        background: "linear-gradient(to right, #ffffff, #f8f9fa)",
        borderBottom: "1px solid rgba(0,0,0,0.1)"
      }}
    >
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand 
          as={Link} 
          to="/Home" 
          className="d-flex align-items-center text-dark"
          style={{ 
            fontSize: "1.8rem",
            fontWeight: "700",
            letterSpacing: "-0.5px"
          }}
        >
          <GiFruitBowl 
            className="me-2" 
            style={{ 
              fontSize: "2.2rem",
              color: "#28a745"
            }} 
          />
          <span>Bites India</span>
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="border-0"
          style={{ 
            boxShadow: "none",
            padding: "0.5rem"
          }}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link 
              as={Link} 
              to="/Home" 
              className="d-flex align-items-center text-dark fw-medium"
              style={{ fontSize: "1rem" }}
            >
              <FaHome className="me-2" />
              Home
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/cartpage" 
              className="d-flex align-items-center text-dark fw-medium position-relative"
              style={{ fontSize: "1rem" }}
            >
              <FaShoppingCart className="me-2" />
              Cart
              {cartItemCount > 0 && (
                <Badge 
                  bg="success" 
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  style={{ 
                    fontSize: "0.7rem",
                    padding: "0.25rem 0.5rem"
                  }}
                >
                  {cartItemCount}
                </Badge>
              )}
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/orders" 
              className="d-flex align-items-center text-dark fw-medium"
              style={{ fontSize: "1rem" }}
            >
              <FaClipboardList className="me-2" />
              Orders
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/About" 
              className="d-flex align-items-center text-dark fw-medium"
              style={{ fontSize: "1rem" }}
            >
              <FaInfoCircle className="me-2" />
              About Us
            </Nav.Link>

            {isAuthenticated ? (
              <Button 
                variant="outline-danger" 
                className="d-flex align-items-center gap-2 fw-medium"
                onClick={handleLogout}
                style={{ 
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  borderWidth: "2px"
                }}
              >
                <FaSignOutAlt />
                Logout
              </Button>
            ) : (
              <Button 
                variant="success" 
                className="d-flex align-items-center gap-2 fw-medium"
                onClick={() => navigate("/login")}
                style={{ 
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  fontSize: "1rem"
                }}
              >
                <FaUser />
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
