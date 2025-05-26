# 🛍️ Enterprise E-Commerce Microservices Platform

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green.svg)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-7.0-red.svg)](https://redis.io/)
[![Kafka](https://img.shields.io/badge/Kafka-3.4-black.svg)](https://kafka.apache.org/)
[![Docker](https://img.shields.io/badge/Docker-24.0-blue.svg)](https://www.docker.com/)
[![ELK](https://img.shields.io/badge/ELK-8.9.0-orange.svg)](https://www.elastic.co/what-is/elk-stack)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, scalable e-commerce platform built with microservices architecture, demonstrating enterprise-grade software development practices and cloud-native design patterns. Features real-time updates through Kafka, comprehensive logging with ELK stack, and containerized deployment.

## ✨ Key Features

- 🔐 **Secure Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control
  - Enhanced logging for authentication events

- 🛍️ **Product Management**
  - Real-time inventory tracking via Kafka
  - Advanced search and filtering
  - Category management
  - Asynchronous updates for inventory changes

- 🛒 **Shopping Experience**
  - Persistent shopping cart
  - Containerized frontend for consistent deployment

- 💳 **Order Processing**
  - Multi-step checkout
  - Order history and tracking
  - Asynchronous order status updates

## 🏗️ Architecture

### Microservices Breakdown

1. **User Service** (`user-service/`)
   - User management and authentication
   - Profile management
   - Role-based permissions
   - Enhanced logging with ELK integration

2. **Product Service** (`product-service/`)
   - Product catalog management
   - Inventory tracking
   - Search and filtering
   - Kafka-based real-time updates

3. **Cart Service** (`cart_service/`)
   - Shopping cart management
   - Price calculations
   - Cart persistence

4. **Order Service** (`order-service/`)
   - Order processing
   - Kafka-based order status updates

### Technology Stack

#### Backend Services
- **Core Framework**: Spring Boot 3.1.0
- **API Gateway**: Spring Cloud Gateway
- **Service Discovery**: Eureka Server
- **Database**: 
  - MongoDB (Product & Order data)
  - PostgreSQL (User data)
  - Redis (Caching & Cart)
- **Message Broker**: Apache Kafka
- **Security**: Spring Security, JWT
- **Documentation**: Swagger/OpenAPI
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Logging Framework**: Logback with Logstash integration

#### Frontend
- **Framework**: React 18
- **State Management**: Redux Toolkit
- **UI Components**: Material-UI
- **Styling**: Tailwind CSS
- **API Client**: Axios
- **Routing**: React Router DOM
- **Containerization**: Docker
- **Real-time Updates**: Kafka integration

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Docker and Docker Compose
- MongoDB
- Redis
- Apache Kafka
- PostgreSQL
- ELK Stack (Elasticsearch, Logstash, Kibana)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ecommerce-microservices-platform.git
   cd ecommerce-microservices-platform
   cd Microservices
   docker-compose up -d
   ```
   run all microservices in IDE

2. **Start Infrastructure Services**
   ```bash
   cd elk-docker-setup
   docker-compose up -d
   ```

4. **Start Frontend**
   ```bash
   cd Frontend
   npm start
   ```

## 📊 Monitoring and Logging

### ELK Stack Integration
- **Centralized Logging**: All microservices logs are collected and processed
- **Logstash Configuration**: Custom patterns for structured logging
- **Elasticsearch**: Efficient log storage and indexing
- **Kibana**: Real-time log visualization and analysis
- **Logback Integration**: Structured logging with Logstash appender

### Monitoring Features
- Real-time log streaming
- Custom dashboards for different services
- Authentication event tracking
- Performance metrics visualization
- Error tracking and alerting

## 🔧 Development


## 📈 Performance Optimizations recommendations

- Redis caching for frequently accessed data
- Asynchronous processing with Kafka
- Database indexing and query optimization
- CDN integration for static assets
- Load balancing and horizontal scaling
- Containerized deployment for consistent environments
- Optimized logging with Logback

## 🔐 Security Features

- JWT-based authentication
- Role-based access control
- HTTPS enforcement
- Input validation and sanitization
- CORS configuration
## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Jeethan Joel Crasta**- [Your GitHub](https://github.com/Jeethanxx01)


⭐ Star this repository if you find it helpful!