import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GiFruitBowl } from "react-icons/gi";
import { Alert } from 'react-bootstrap';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/auth/signin", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.jwt);
      setMessage({ text: "Login successful!", type: "success" });
      setTimeout(() => {
        navigate("/Home");
      }, 1500);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.error || "Server error please try again later", 
        type: "danger" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <GiFruitBowl 
                    className="text-success" 
                    style={{ fontSize: "4rem" }} 
                  />
                  <h2 className="mt-3 mb-2 fw-bold">Welcome Back</h2>
                  <p className="text-muted">Sign in to continue shopping</p>
                </div>

                {message && (
                  <Alert 
                    variant={message.type} 
                    className="mb-4" 
                    onClose={() => setMessage("")} 
                    dismissible
                  >
                    {message.text}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input 
                      className="form-control form-control-lg border-2" 
                      type="email" 
                      name="email" 
                      placeholder="Email address" 
                      onChange={handleChange} 
                      required 
                    />
                  </div>

                  <div className="mb-4 position-relative">
                    <input
                      className="form-control form-control-lg border-2"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 
                        <VisibilityOff className="text-muted" /> : 
                        <Visibility className="text-muted" />
                      }
                    </button>
                  </div>

                  <button 
                    className="btn btn-success btn-lg w-100 py-3 mb-4" 
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : null}
                    Sign In
                  </button>

                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Don't have an account?
                      <button 
                        type="button"
                        className="btn btn-link p-0 ms-2 text-success" 
                        onClick={() => navigate("/signup")}
                      >
                        Create Account
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
