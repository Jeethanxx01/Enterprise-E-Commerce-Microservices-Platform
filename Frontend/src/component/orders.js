import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Spinner, Badge, Button, Modal } from "react-bootstrap";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:5004/order", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5004/order/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) throw new Error("Failed to cancel order");
      
      // Update the orders list by removing the cancelled order
      setOrders(orders.filter(order => order.id !== orderId));
      setShowCancelModal(false);
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order. Please try again.");
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );

  if (!orders.length) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <h5 className="text-muted">No orders available</h5>
    </div>
  );

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Your Orders</h2>
      {orders.map((order) => (
        <Card key={order.id || Math.random()} className="mb-4 shadow-sm border-0 rounded-lg overflow-hidden">
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-1">{order.fullName || "Unknown"}</h5>
                <p className="text-muted small mb-0">{order.email || "No email provided"}</p>
              </div>
              <div className="d-flex align-items-center gap-3">
                <Badge bg="primary" className="px-3 py-2">Order #{order.id?.slice(0, 8) || "N/A"}</Badge>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowCancelModal(true);
                  }}
                >
                  Cancel Order
                </Button>
              </div>
            </div>

            <div className="bg-light p-3 rounded mb-4">
              <Row className="g-3">
                {order.products?.map((product, index) => (
                  <Col key={index} xs={6} sm={4} md={3}>
                    <Card className="h-100 border-0 shadow-sm">
                      <Card.Img 
                        variant="top" 
                        src={product.imageUrl || "https://via.placeholder.com/150"} 
                        style={{ height: "120px", objectFit: "cover" }} 
                        className="rounded-top"
                      />
                      <Card.Body className="p-3">
                        <Card.Title className="small fw-bold mb-1">{product.name || "No Name"}</Card.Title>
                        <p className="small text-primary mb-0"><strong>₹{product.price ?? "N/A"}</strong></p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            <div className="row g-3">
              <Col md={6}>
                <div className="bg-light p-3 rounded">
                  <h6 className="text-primary mb-3">Shipment Details</h6>
                  <p className="mb-1"><strong>Name:</strong> {order.shipmentDetails?.name || "N/A"}</p>
                  <p className="mb-1"><strong>Contact:</strong> {order.shipmentDetails?.mobileNumber || "N/A"}</p>
                  <p className="mb-0"><strong>Address:</strong> {order.shipmentDetails?.address || "No address available"}</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="bg-light p-3 rounded">
                  <h6 className="text-primary mb-3">Payment Information</h6>
                  <p className="mb-1"><strong>Method:</strong> {order.shipmentDetails?.paymentMethod || "N/A"}</p>
                  <p className="mb-0"><strong>Total Amount:</strong> <span className="text-success">₹{order.totalAmount ?? "0.00"}</span></p>
                </div>
              </Col>
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* Cancel Order Confirmation Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this order? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Close
          </Button>
          <Button 
            variant="danger" 
            onClick={() => handleCancelOrder(selectedOrder?.id)}
          >
            Yes, Cancel Order
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Orders;
