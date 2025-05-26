import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormControl, Button, Container, Row, Col, Card, Spinner, Alert, Dropdown, Badge } from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaFilter } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";

const ProductCard = React.memo(({ product, onNavigate }) => (
  <Col sm={12} md={4} lg={3} key={product.id} className="mb-4">
    <Card 
      onClick={() => onNavigate(`/item/${product.id}`)}
      className="shadow-sm border-0 product-card h-100"
      style={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        borderRadius: "12px",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={product.imageUrl} 
          alt={product.name}
          style={{ 
            height: "220px", 
            objectFit: "cover",
            borderBottom: "1px solid rgba(0,0,0,0.1)"
          }}
        />
        {product.stock < 50 && (
          <Badge 
            bg="danger" 
            className="position-absolute top-0 end-0 m-2"
            style={{ fontSize: "0.8rem" }}
          >
            Limited Stock
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title 
          className="fw-bold mb-2" 
          style={{ 
            fontSize: "1.1rem",
            color: "#2c3e50"
          }}
        >
          {product.name}
        </Card.Title>
        <Card.Text 
          className="mb-3" 
          style={{ 
            color: "#27ae60", 
            fontWeight: "bold", 
            fontSize: "1.2rem" 
          }}
        >
          ₹{product.price}
        </Card.Text>
        <div className="mt-auto">
          {product.stock === 0 ? (
            <Button 
              variant="secondary" 
              className="w-100 py-2" 
              style={{ borderRadius: "8px" }} 
              disabled
            >
              <FaShoppingCart className="me-2" />
              Out of Stock
            </Button>
          ) : (
            <Button 
              variant="success" 
              className="w-100 py-2" 
              style={{ 
                borderRadius: "8px",
                fontSize: "1rem"
              }}
            >
              <FaShoppingCart className="me-2" />
              Add to Cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  </Col>
));

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:5002/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again.");
        setLoading(false);
      });
  }, []);

  const fetchCategories = useCallback(() => {
    axios
      .get("http://localhost:5002/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const fetchProductsByCategory = useCallback((categoryId) => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:5002/products/category/${categoryId}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products by category:", error);
        setError("Failed to fetch products for selected category.");
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <Container className="my-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <GiFruitBowl 
          className="text-success" 
          style={{ fontSize: "4rem" }} 
        />
        <h1 className="fw-bold mt-3 mb-2">Premium Dry Fruits</h1>
        <p className="text-muted">Discover our selection of premium quality dry fruits</p>
      </div>

      {/* Search & Filter Section */}
      <Row className="justify-content-center mb-5">
        <Col md={8} lg={6}>
          <div 
            className="d-flex align-items-center p-3" 
            style={{ 
              background: "#fff", 
              borderRadius: "12px", 
              boxShadow: "0 2px 15px rgba(0,0,0,0.1)" 
            }}
          >
            <div className="d-flex align-items-center flex-grow-1 me-3">
              <FaSearch className="text-muted me-2" />
              <FormControl
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0"
                style={{ 
                  fontSize: "1rem",
                  background: "transparent"
                }}
              />
            </div>
            
            <Dropdown>
              <Dropdown.Toggle 
                variant="outline-success" 
                className="d-flex align-items-center"
                style={{ 
                  borderRadius: "8px",
                  padding: "8px 16px"
                }}
              >
                <FaFilter className="me-2" />
                {selectedCategory ? 
                  categories.find(cat => cat.id === selectedCategory)?.name : 
                  "All Categories"
                }
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ borderRadius: "8px" }}>
                <Dropdown.Item
                  onClick={() => {
                    setSelectedCategory(null);
                    fetchProducts();
                  }}
                  className="py-2"
                >
                  All Categories
                </Dropdown.Item>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <Dropdown.Item
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        fetchProductsByCategory(category.id);
                      }}
                      className="py-2"
                    >
                      {category.name}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item disabled className="py-2">
                    No categories available
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>

      {/* Loading State */}
      {loading && (
        <div className="text-center my-5">
          <Spinner 
            animation="border" 
            variant="success" 
            style={{ width: "3rem", height: "3rem" }} 
          />
          <p className="mt-3 text-muted">Loading premium products...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Alert 
          variant="danger" 
          className="text-center mb-4"
          style={{ borderRadius: "12px" }}
        >
          <strong>Oops! Something went wrong</strong>
          <p className="mb-0 mt-2">{error}</p>
          <Button 
            variant="outline-danger" 
            size="sm" 
            className="mt-3" 
            onClick={fetchProducts}
          >
            Try Again
          </Button>
        </Alert>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <Row>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onNavigate={navigate}
              />
            ))
          ) : (
            <Col className="text-center py-5">
              <div 
                className="p-4" 
                style={{ 
                  background: "#f8f9fa", 
                  borderRadius: "12px" 
                }}
              >
                <GiFruitBowl 
                  className="text-muted" 
                  style={{ fontSize: "3rem" }} 
                />
                <p className="mt-3 mb-0" style={{ fontSize: "1.1rem" }}>
                  No products found matching your search.
                </p>
              </div>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default React.memo(Home);
