import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Card, Spinner, Alert, Button } from 'react-bootstrap';

const OrderSummary = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(null);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderSummary = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Authorization token is missing.");
                }

                const response = await axios.get("http://localhost:5003/cart", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setOrder(response.data);
            } catch (err) {
                setError("Failed to fetch order summary. " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderSummary();
    }, []);

    const placeOrder = async () => {
        try {
            setIsPlacingOrder(true);
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Authorization token is missing.");
            }

            const response = await axios.post("http://localhost:5004/order/save", order, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                navigate("/success");
            }
        } catch (err) {
            setAlert({
                type: "danger",
                message: "Failed to place order: " + err.message,
            });
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <Alert variant="info" className="text-center">
                    No order data available.
                </Alert>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <Card className="border-0 shadow-sm" style={{ maxWidth: "800px", margin: "0 auto" }}>
                <Card.Body className="p-4">
                    {/* Alert Message */}
                    {alert && (
                        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
                            {alert.message}
                        </Alert>
                    )}

                    {/* Order Header */}
                    <h3 className="text-center text-primary mb-4">Order Summary</h3>

                    {/* Customer Details */}
                    <Card className="mb-4 border-0 bg-light">
                        <Card.Body>
                            <h5 className="text-primary mb-3">Customer Information</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="mb-2"><strong>Name:</strong> {order.fullName}</p>
                                    <p className="mb-0"><strong>Email:</strong> {order.email}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Product List */}
                    <Card className="mb-4 border-0 bg-light">
                        <Card.Body>
                            <h5 className="text-primary mb-3">Order Items</h5>
                            <div className="row g-3">
                                {order.products.map((product, index) => (
                                    <div key={index} className="col-12">
                                        <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm">
                                            <img 
                                                src={product.imageUrl} 
                                                alt={product.name} 
                                                className="rounded me-3" 
                                                style={{ width: "80px", height: "80px", objectFit: "cover" }} 
                                            />
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1 text-primary">{product.name}</h6>
                                                <p className="mb-1 small text-muted">{product.description}</p>
                                                <p className="mb-0 small"><strong>Quantity:</strong> {product.quantity}</p>
                                            </div>
                                            <div className="text-end">
                                                <h6 className="text-danger mb-0">${product.price.toFixed(2)}</h6>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Shipment Details */}
                    <Card className="mb-4 border-0 bg-light">
                        <Card.Body>
                            <h5 className="text-primary mb-3">Delivery Information</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="mb-2"><strong>Recipient:</strong> {order.shipmentDetails.name}</p>
                                    <p className="mb-2"><strong>Mobile:</strong> {order.shipmentDetails.mobileNumber}</p>
                                    <p className="mb-2"><strong>Email:</strong> {order.shipmentDetails.email}</p>
                                </div>
                                <div className="col-md-6">
                                    <p className="mb-2"><strong>Address:</strong> {order.shipmentDetails.address}</p>
                                    {order.shipmentDetails.additionalDeliveryDetails && (
                                        <p className="mb-2">
                                            <strong>Additional Details:</strong> {order.shipmentDetails.additionalDeliveryDetails}
                                        </p>
                                    )}
                                    <p className="mb-0">
                                        <strong>Payment Method:</strong>{" "}
                                        <span className="text-success fw-bold">{order.shipmentDetails.paymentMethod}</span>
                                    </p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-between mt-4">
                        <Button 
                            variant="outline-primary" 
                            onClick={() => navigate("/orderdetails")}
                            disabled={isPlacingOrder}
                        >
                            Back
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={placeOrder}
                            disabled={isPlacingOrder}
                            className="position-relative"
                            style={{ minWidth: "120px" }}
                        >
                            {isPlacingOrder ? (
                                <>
                                    <Spinner 
                                        animation="border" 
                                        size="sm" 
                                        className="me-2" 
                                        style={{ width: "1rem", height: "1rem" }}
                                    />
                                    Placing Order...
                                </>
                            ) : (
                                "Place Order"
                            )}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default OrderSummary;
