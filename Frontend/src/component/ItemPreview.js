import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button, Spinner, Alert, Row, Col, Form, Badge } from "react-bootstrap";
import { FaStar, FaShoppingCart, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import bannerImage from "../assests/bannered.png";

const AddToCartButton = ({ itemId, selectedWeight, stock }) => {
  const token = localStorage.getItem("token");
  const [isAdding, setIsAdding] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await axios.post(
        `http://localhost:5003/cart/add/${itemId}/${selectedWeight}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlert({ message: "Product added to cart successfully!", type: "success" });
    } catch (error) {
      setAlert({ message: "Failed to add product to cart. Please try again.", type: "danger" });
    } finally {
      setTimeout(() => setAlert({ message: "", type: "" }), 2000);
      setIsAdding(false);
    }
  };

  if (stock === 0) {
    return (
      <Button
        variant="secondary"
        className="w-100 py-3"
        style={{ borderRadius: "8px" }}
        disabled
      >
        <FaShoppingCart className="me-2" />
        Out of Stock
      </Button>
    );
  }

  return (
    <>
      {alert.message && (
        <Alert 
          variant={alert.type} 
          className="mb-3" 
          onClose={() => setAlert({ message: "", type: "" })} 
          dismissible
        >
          {alert.message}
        </Alert>
      )}
      <Button
        variant="success"
        className="w-100 py-3"
        style={{ 
          borderRadius: "8px", 
          transition: "all 0.3s ease",
          fontSize: "1.1rem"
        }}
        onClick={handleAddToCart}
        disabled={isAdding}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        {isAdding ? (
          <Spinner animation="border" size="sm" className="me-2" />
        ) : (
          <FaShoppingCart className="me-2" />
        )}
        Add to Cart
      </Button>
    </>
  );
};

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} className="text-warning" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-warning" />);
    }
  }

  return <div className="d-flex gap-1">{stars}</div>;
};

const ItemPreview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(100);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewError, setReviewError] = useState(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5002/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch product details.");
        setLoading(false);
      });
  }, [id]);

  const handleWeightChange = (event) => {
    setSelectedWeight(parseInt(event.target.value));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    const newReview = { id: Date.now().toString(), comment, rating };

    axios
      .post(
        `http://localhost:5002/api/reviews?productId=${id}`,
        newReview,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setProduct((prevProduct) => ({
          ...prevProduct,
          reviews: [...prevProduct.reviews, response.data],
        }));
        setComment("");
        setRating(5);
        setReviewError(null);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.message || 'Invalid review content';
          setReviewError(errorMessage);
        } else {
          setReviewError("Failed to submit review. Please try again.");
        }
      })
      .finally(() => {
        setIsSubmittingReview(false);
      });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="success" style={{ width: "3rem", height: "3rem" }} />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  const pricePerGram = product.price / 100;
  const calculatedPrice = pricePerGram * selectedWeight;

  return (
    <Container className="my-5">
      <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
        <Row className="g-0">
          <Col md={5} className="p-4">
            <div className="position-relative">
              <Card.Img 
                src={product.imageUrl} 
                alt={product.name} 
                className="rounded-4 shadow-sm" 
                style={{ 
                  width: "100%", 
                  height: "400px", 
                  objectFit: "cover" 
                }} 
              />
              {product.stock < 50 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 end-0 m-3"
                  style={{ fontSize: "0.9rem" }}
                >
                  Limited Stock
                </Badge>
              )}
            </div>
          </Col>
          <Col md={7} className="p-4">
            <Card.Body className="h-100 d-flex flex-column">
              <div className="mb-4">
                <h1 className="fw-bold text-dark mb-2">{product.name}</h1>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <h3 className="text-success mb-0">₹{calculatedPrice.toFixed(2)}</h3>
                  <Badge bg="light" text="dark" className="fs-6">
                    {selectedWeight}g
                  </Badge>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <StarRating rating={product.rating || 0} />
                  <span className="text-muted">({product.reviews?.length || 0} reviews)</span>
                </div>
              </div>

              <div className="mb-4">
                <Form.Group>
                  <Form.Label className="fw-bold d-flex align-items-center gap-2">
                    <GiWeight />
                    Select Quantity (in Grams)
                  </Form.Label>
                  <Form.Select 
                    value={selectedWeight} 
                    onChange={handleWeightChange} 
                    className="border-2"
                    style={{ fontSize: "1.1rem" }}
                  >
                    {product.stock >= 100 && <option value="100">100g</option>}
                    {product.stock >= 300 && <option value="300">300g</option>}
                    {product.stock >= 500 && <option value="500">500g</option>}
                    {product.stock >= 1000 && <option value="1000">1000g</option>}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="mb-4">
                <p className="text-muted mb-3">{product.description}</p>
                <img src={bannerImage} alt="Banner" className="w-100 rounded-3" />
              </div>

              <div className="mt-auto">
                <AddToCartButton itemId={id} selectedWeight={selectedWeight} stock={product.stock} />
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Card className="mt-4 border-0 shadow-lg rounded-4">
        <Card.Body className="p-4">
          <h3 className="fw-bold mb-4">Customer Reviews</h3>
          
          <Form onSubmit={handleReviewSubmit} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Your Review</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                required 
                className="border-2"
                placeholder="Share your experience with this product..."
                disabled={isSubmittingReview}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Rating</Form.Label>
              <Form.Select 
                value={rating} 
                onChange={(e) => setRating(Number(e.target.value))}
                className="border-2"
                disabled={isSubmittingReview}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Star' : 'Stars'}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button 
              type="submit" 
              variant="success" 
              className="w-100 py-3"
              style={{ fontSize: "1.1rem" }}
              disabled={isSubmittingReview}
            >
              {isSubmittingReview ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Submitting Review...
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
          </Form>

          {reviewError && (
            <Alert 
              variant="danger" 
              className="mb-4" 
              onClose={() => {
                setReviewError(null);
                setComment("");
                setRating(5);
              }} 
              dismissible
            >
              {reviewError}
            </Alert>
          )}

          <div className="mt-4">
            {product.reviews?.length > 0 ? (
              product.reviews.map((review) => (
                <Card key={review.id} className="mb-3 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="mb-0">{review.username}</h5>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-muted mb-0">{review.comment}</p>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-muted mb-0">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ItemPreview;
