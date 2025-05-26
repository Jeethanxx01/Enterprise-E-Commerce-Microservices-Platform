import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const [newShipment, setNewShipment] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    address: "",
    additionalDeliveryDetails: "",
    paymentMethod: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5001/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        setError("Failed to load user profile. Please try again.");
        console.error("Error fetching user profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!formData.address.trim()) {
      setError("Address is required!");
      return;
    }
    if (!formData.paymentMethod) {
      setError("Please select a payment method!");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const shipmentDetails = newShipment ? formData : {
        name: userInfo.fullName,
        mobileNumber: userInfo.mobile,
        email: userInfo.email,
        address: formData.address,
        additionalDeliveryDetails: formData.additionalDeliveryDetails,
        paymentMethod: formData.paymentMethod
      };
      
      await axios.post("http://localhost:5003/cart/addshipmentdetails", shipmentDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      navigate("/ordersummary");
    } catch (error) {
      setError("Failed to process order. Please try again.");
      console.error("Error placing order", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userInfo) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h3 className="text-center text-primary mb-4">Order Details</h3>

              {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                  {error}
                </Alert>
              )}

              <div className="mb-4">
                <h5 className="text-primary mb-3">Shipping Information</h5>
                
                <div className="mb-4">
                  <Form.Check
                    type="radio"
                    id="existingShipment"
                    label="Use Existing Details"
                    name="shipment"
                    className="mb-3"
                    onChange={() => setNewShipment(false)}
                    defaultChecked
                  />
                  
                  <Card className={`mb-3 ${!newShipment ? 'border-primary' : 'border-light'}`}>
                    <Card.Body className="bg-light">
                      {userInfo ? (
                        <>
                          <p className="mb-2"><strong>Full Name:</strong> {userInfo.fullName}</p>
                          <p className="mb-2"><strong>Mobile:</strong> {userInfo.mobile}</p>
                          <p className="mb-0"><strong>Email:</strong> {userInfo.email}</p>
                        </>
                      ) : (
                        <Spinner animation="border" size="sm" />
                      )}
                    </Card.Body>
                  </Card>

                  <Form.Check
                    type="radio"
                    id="newShipment"
                    label="New Shipping Details"
                    name="shipment"
                    className="mb-3"
                    onChange={() => setNewShipment(true)}
                  />
                </div>

                {newShipment && (
                  <div className="mb-4">
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="Enter your mobile number"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                    </Form.Group>
                  </div>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete delivery address"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Additional Delivery Instructions (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="additionalDeliveryDetails"
                    value={formData.additionalDeliveryDetails}
                    onChange={handleChange}
                    placeholder="Any special delivery instructions"
                  />
                </Form.Group>
              </div>

              <div className="mb-4">
                <h5 className="text-primary mb-3">Payment Method</h5>
                <div className="d-flex flex-column gap-2">
                  <Form.Check
                    type="radio"
                    id="cod"
                    label="Cash on Delivery"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    onChange={handleChange}
                    className="p-3 border rounded bg-light"
                  />
                  <Form.Check
                    type="radio"
                    id="online"
                    label="Online Payment"
                    name="paymentMethod"
                    value="Online Payment"
                    onChange={handleChange}
                    className="p-3 border rounded bg-light"
                  />
                </div>
              </div>

              <div className="d-grid gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={loading}
                  className="py-3"
                >
                  {loading ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                        style={{ width: "1rem", height: "1rem" }}
                      />
                      Processing...
                    </>
                  ) : (
                    "Proceed to Order Summary"
                  )}
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate("/cartpage")}
                  disabled={loading}
                >
                  Back to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetails;
