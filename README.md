# 🛒 E-Commerce Microservices Platform

This project demonstrates a comprehensive **microservice architecture** for an e-commerce platform, focusing on **role-based authentication**, **efficient data handling**, and **asynchronous communication** to ensure **scalability**, **performance**, and **maintainability**.

---

## 🔧 Tech Stack

### 🖥️ Backend
- **Spring Boot**
- **Spring Gateway Server** – API Gateway for routing
- **Eureka Server** – Service discovery
- **JWT Authentication** – Role-based access control
- **SQL Database** – For user authentication
- **MongoDB** – For product management
- **Redis** – In-memory cart data storage
- **Apache Kafka** – For asynchronous inventory updates
- **JPA & MongoRepository** – ORM tools

### 🖼️ Frontend
- **React.js**
- **Redux Toolkit** – State management
- **Axios** – API communication
- **React Router DOM** – Client-side routing
- **Tailwind CSS & Material UI** – Responsive UI design

---

## 📦 Microservices Overview

### 🔐 Authentication Service
- Implements **JWT-based role authentication**
- Stores user credentials in **SQL Database**
- Handles **login**, **registration**, and **authorization**

### 📦 Product Service
- Manages product listings and availability
- Uses **MongoDB** for product data
- Integrates with **Kafka** for real-time stock updates

### 🛒 Cart Service
- Uses **Redis** for fast, in-memory cart operations
- Ensures efficient session management for user carts

### 📦 Order Service
- Handles **order placement**, **order history**, and **payment methods**
- Ensures reliable transaction workflows

---

## 🔁 Communication & Coordination
- **Eureka Server** enables service discovery
- **Spring Cloud Gateway** routes requests to appropriate microservices
- **Apache Kafka** ensures asynchronous, decoupled communication for real-time updates

---

## 🧱 Architectural Principles
- Built using **Object-Oriented Programming (OOP)**
- Follows **System Design best practices**
- Ensures **loose coupling** and **high cohesion** across services

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 16+
- Docker (optional for containerization)
- MongoDB, Redis, Kafka, and SQL database setup

### Clone the Repository
```bash
git clone https://github.com/your-username/ecommerce-microservices-platform.git
cd ecommerce-microservices-platform
```
Run Backend Services

```bash
  cd backend
./mvnw spring-boot:run
```

Run Frontend

```bash
  cd frontend
  npm install
  npm start
```

## Folder Structure

├── backend\
│   ├── auth-service\
│   ├── product-service\
│   ├── cart-service\
│   ├── order-service\
│   ├── gateway-service\
│   └── eureka-server\
├── frontend\
│   └── react-app\
└── README.md
## 📃 License

This project is licensed under the MIT License - see the   [LICENSE](https://github.com/Jeethanxx01/E-commerce/blob/main/LICENSE) file for details


## 🙌 Contributions
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.