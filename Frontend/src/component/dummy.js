import React, { useState, useEffect } from "react";
import { Container, Card, Button, Table, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5002/cart");
        setCartItems(response.data);
      } catch (err) {
        setError("Failed to fetch cart items.");
      }
    };
    fetchCartItems();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/cart/${id}`);
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to remove item.");
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);
  };

  return (
    <Container className="my-4">
      <Card className="p-4 shadow-lg border-0">
        <h3 className="text-center text-primary">Shopping Cart</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {cartItems.length === 0 ? (
          <p className="text-center text-muted">Your cart is empty.</p>
        ) : (
          <>
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity || 1}</td>
                    <td>₹{(item.price * (item.quantity || 1)).toFixed(2)}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h4 className="text-end mt-3">Total: ₹{getTotalPrice()}</h4>
            <Button className="w-100 mt-3 btn-success" onClick={() => navigate("/payment")}>Proceed to Payment</Button>
          </>
        )}
      </Card>
    </Container>
  );
};

export default CartPage;
