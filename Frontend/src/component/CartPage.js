import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaArrowRight } from "react-icons/fa";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [stockError, setStockError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5003/cart", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch cart data");

        const cartData = await response.json();
        setCartItems(cartData.products || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to fetch cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [token]);

  const handleRemove = async (itemId) => {
    try {
      setProcessing(true);
      const response = await fetch(`http://localhost:5003/cart/remove/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to remove item");

      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item from cart");
    } finally {
      setProcessing(false);
    }
  };

  const handleClearCart = async () => {
    try {
      setProcessing(true);
      const response = await fetch("http://localhost:5003/cart", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to clear cart");

      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      setError("Failed to clear cart");
    } finally {
      setProcessing(false);
    }
  };

  const checkStockAvailability = async () => {
    try {
      setProcessing(true);
      const stockChecks = await Promise.all(
        cartItems.map(async (item) => {
          const response = await fetch(`http://localhost:5002/products/${item.id}`);
          if (!response.ok) throw new Error("Failed to fetch product details");
          const productData = await response.json();
          return {
            id: item.id,
            name: item.name,
            requestedQuantity: item.quantity,
            availableStock: productData.stock
          };
        })
      );

      const insufficientStock = stockChecks.filter(
        item => item.requestedQuantity > item.availableStock
      );

      if (insufficientStock.length > 0) {
        const errorMessage = insufficientStock.map(item => 
          `${item.name}: Requested ${item.requestedQuantity}g, Available ${item.availableStock}g`
        ).join('\n');
        setStockError(errorMessage);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error checking stock:", error);
      setError("Failed to verify stock availability");
      return false;
    } finally {
      setProcessing(false);
    }
  };

  const handleProceedToOrder = async () => {
    setStockError(null);
    const isStockAvailable = await checkStockAvailability();
    if (isStockAvailable) {
      navigate("/orderdetails");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-primary mb-0">
                  <FaShoppingCart className="me-2" />
                  Shopping Cart
                </h3>
                <Badge bg="primary" className="fs-6">
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </Badge>
              </div>

              {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                  {error}
                </Alert>
              )}

              {stockError && (
                <Alert variant="warning" onClose={() => setStockError(null)} dismissible>
                  <h5 className="mb-3">Insufficient Stock</h5>
                  {stockError.split('\n').map((line, index) => (
                    <p key={index} className="mb-1">{line}</p>
                  ))}
                  <p className="mt-3 mb-0">Please update your cart quantities or remove items with insufficient stock.</p>
                </Alert>
              )}

              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <Card key={item.id} className="mb-3 border-0 shadow-sm">
                    <Card.Body className="p-3">
                      <Row className="align-items-center">
                        <Col xs={3} md={2}>
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{ height: "100px", objectFit: "cover", width: "100%" }}
                          />
                        </Col>
                        <Col xs={9} md={6}>
                          <h5 className="text-primary mb-2">{item.name}</h5>
                          <p className="text-muted small mb-2">{item.description}</p>
                          <p className="mb-0">
                            <Badge bg="info">Quantity: {item.quantity}</Badge>
                          </p>
                        </Col>
                        <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
                          <h5 className="text-danger mb-3">₹{item.price}</h5>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemove(item.id)}
                            disabled={processing}
                          >
                            <FaTrash className="me-1" />
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <div className="text-center py-5">
                  <FaShoppingCart size={48} className="text-muted mb-3" />
                  <h4 className="text-muted">Your cart is empty</h4>
                  <p className="text-muted">Start shopping to add items to your cart</p>
                </div>
              )}
            </Card.Body>
          </Card>

          {cartItems.length > 0 && (
            <>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h4 className="text-primary mb-4">Order Summary</h4>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="fw-bold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Shipping</span>
                    <span className="text-success">Free</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-0">Total</h5>
                    <h5 className="text-primary mb-0">₹{subtotal.toFixed(2)}</h5>
                  </div>
                </Card.Body>
              </Card>

              <div className="d-grid gap-3">
                <Button
                  variant="danger"
                  size="lg"
                  onClick={handleClearCart}
                  disabled={processing || cartItems.length === 0}
                >
                  {processing ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaTrash className="me-2" />
                      Clear Cart
                    </>
                  )}
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleProceedToOrder}
                  disabled={processing || cartItems.length === 0}
                >
                  {processing ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout
                      <FaArrowRight className="ms-2" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
