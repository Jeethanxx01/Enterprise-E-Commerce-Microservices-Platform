import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar, Nav, FormControl, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const DryFruitShop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired! Please log in again.");
      navigate("/login", { replace: true });
      return;
    }

    const fetchProtectedData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/protected-route", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchProtectedData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out!");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    };
  }, [navigate]);

  const dryFruits = [
    { name: "Almonds", price: 200, imgSrc: "/images/almonds.jpg" },
    { name: "Cashews", price: 300, imgSrc: "/images/cashews.jpg" },
    { name: "Walnuts", price: 150, imgSrc: "/images/walnuts.jpg" },
    { name: "Pistachios", price: 250, imgSrc: "/images/pistachios.jpg" },
  ];

  const filteredFruits = dryFruits
    .filter(fruit => fruit.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <div>
      {/* Navbar with Profile Icon and Logout */}
      <Navbar bg="success" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <FaUserCircle size={30} className="me-2" />
            Dry Fruit Shop
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
            <Button variant="danger" className="ms-3" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Search Section */}
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={6} className="d-flex">
            <FormControl
              type="text"
              placeholder="Search for dry fruits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="light" className="ms-2" onClick={() => console.log("Search")}>
              Search
            </Button>
            <Button
              variant="light"
              className="ms-2"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Product Cards */}
      <Container>
        <Row>
          {filteredFruits.map((fruit, index) => (
            <Col sm={12} md={4} lg={3} key={index} className="mb-3">
              <Card>
                <Card.Img variant="top" src={fruit.imgSrc} />
                <Card.Body>
                  <Card.Title>{fruit.name}</Card.Title>
                  <Card.Text>₹{fruit.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Protected Data Section */}
      <Container className="text-center mt-5">
        <h2>Protected Data</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white py-3 mt-5">
        <Container>
          <p className="text-center mb-0">© 2025 Dry Fruit Shop - All rights reserved</p>
        </Container>
      </footer>
    </div>
  );
};

export default DryFruitShop;
