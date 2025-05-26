import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { CheckCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center shadow-lg p-4" style={{ maxWidth: "500px" }}>
        <CheckCircle size={60} className="text-success mb-3" />
        <h2 className="text-success">Order Placed Successfully!</h2>
        <p className="text-muted">Thank you for your purchase. Your order is being processed and will be shipped soon.</p>
        <Button variant="primary" href="/Home">Return to Home</Button>
      </Card>
    </Container>
  );
};

export default SuccessPage;
