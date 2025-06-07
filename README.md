# 🛍️ Microservices Architecture with LLM and Kafka Integration

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green.svg)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-7.0-red.svg)](https://redis.io/)
[![Kafka](https://img.shields.io/badge/Kafka-3.4-black.svg)](https://kafka.apache.org/)
[![Docker](https://img.shields.io/badge/Docker-24.0-blue.svg)](https://www.docker.com/)
[![ELK](https://img.shields.io/badge/ELK-8.9.0-orange.svg)](https://www.elastic.co/what-is/elk-stack)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)


A modern, scalable microservices architecture showcasing LLM integration for intelligent text analysis, Kafka for asynchronous communication, and ELK stack for real-time observability. Designed for event-driven messaging, and AI-enhanced content moderation.

## 🏗️ Architecture & Implementation Overview

### 🟦 1. Microservices Architecture & Frontend
The platform consists of five core services: User, Product, Cart, Order, and AI Review Analysis, each independently deployable and built for specific functionality.

- **User Service**: Uses Spring Boot and MySQL for managing user data and authentication.
- **Product Service**: Built with Spring Boot and MongoDB to handle product listings and inventory.
- **Cart Service**: Optimized using Redis and Spring Boot for fast, temporary session-based storage.
- **Order Service**: Uses Spring Boot and MongoDB for managing transactional order data.
- **AI Service**: Implemented using Flask and integrates with Google's Gemini LLM.

The frontend is a modern, responsive React application built using Create React App (CRA), styled with Material-UI and Bootstrap for a clean and user-friendly interface. It features a modular structure with reusable components, custom hooks, and well-organized routing using React Router DOM. Axios is used for seamless communication with backend services. The interface includes client-side validation, character-limited reviews (e.g., 100 characters max), and gracefully handles edge cases such as product unavailability during checkout. The application is optimized for performance and follows standard development and deployment practices, making it suitable for scalable web platforms.

### 🟨 2. Asynchronous & Synchronous Communication
The system uses REST APIs for synchronous communication and Apache Kafka for asynchronous messaging to ensure loose coupling and scalability.

**Order Placement Flow**: 
- The user adds items via CartService and proceeds to checkout
- The CartService calls the OrderService (via REST)
- OrderService saves the order and publishes an "order-placed" event to Kafka
- ProductService consumes this event and updates inventory in its MongoDB

**Order Cancellation Flow**: 
- If a user cancels an order, the OrderService updates the order status
- OrderService publishes an "order-cancelled" event to Kafka
- ProductService consumes this event and restores the product quantity

This combination of synchronous REST APIs and asynchronous Kafka messaging ensures both reliability in critical transactions and real-time updates without service interdependence.

### 🟣 3. Observability with ELK Stack
The platform integrates the ELK Stack (Elasticsearch, Logstash, Kibana) for centralized logging and real-time observability:
- Each microservice is configured to send logs to Logstash
- Logstash parses and forwards logs to Elasticsearch
- Kibana provides a visual dashboard for monitoring:
  - Service health
  - API usage
  - Error trends
  - Request latency

This setup enables developers and DevOps teams to quickly trace issues, optimize performance, and ensure system transparency across all services.

### 🟠 4. AI-Powered Review Analysis
An AI Review Analysis Service adds an intelligent moderation layer using Google's Gemini API:
- When a user submits a product review, the Product Service forwards it to the AI Service
- This Flask-based service processes the review using Gemini LLM to assess:
  - Relevance
  - Sentiment
  - Appropriateness
- If the review passes validation, it is stored in the database
- If not, a 400 Bad Request is returned with the reason (e.g., spam, offensive language, or irrelevance)

This helps maintain a clean and constructive review section while filtering out promotions, toxic content, or misinformation.

## 📸 Project Visuals

View the all project related  visuals including UI , architecture diagrams, and monitoring dashboards in [Project Images](https://github.com/Jeethanxx01/Microservice-E-commerce-platform/tree/main/Images).

## ✨ Key Features

- 🔐 **Secure Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control
  - Enhanced logging for authentication events

- 🛍️ **Product Management**
  - search and filtering
  - Asynchronous updates for inventory changes
  - AI-powered product review analysis

- 💳 **Order Processing**
  - Multi-step checkout
  - Order history
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
   - Search and filtering
   - Kafka-based real-time updates
   - Review management with AI analysis

3. **Cart Service** (`cart_service/`)
   - Shopping cart management
   - Price calculations
   - Cart Caching on redis cloud

4. **Order Service** (`order-service/`)
   - Order processing
   - Kafka-based order status updates

5. **Review Analysis Service** (`review-analysis-service/`)
   - AI-powered review analysis using Google's Gemini
   - Content validation and relevance checking
   - Multiple analysis categories
   - Comprehensive response structure

### Technology Stack

#### Backend Services
- **Core Framework**: Spring Boot 3.1.0
- **API Gateway**: Spring Cloud Gateway
- **Service Discovery**: Eureka Server
- **Database**: 
  - MongoDB (Product & Order data)
  - MySQL (User data)
  - Redis ( Cart Caching)
- **Message Broker**: Apache Kafka
- **Security**: Spring Security, JWT
- **Documentation**: Swagger
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Logging Framework**: Logback with Logstash integration
- **Containerization**: Docker
- **AI Integration**: Google Gemini AI

#### Frontend
- **Framework**: React 18
- **State Management**: Redux Toolkit
- **UI Components**: Material-UI
- **Styling**: Tailwind CSS
- **API Client**: Axios
- **Routing**: React Router DOM

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Docker and Docker Compose
- MongoDB
- Redis
- Apache Kafka
- MySQL
- ELK Stack (Elasticsearch, Logstash, Kibana)
- IntelliJ IDEA (for backend development)
- Visual Studio Code (for frontend development)

### Installation

1. **Install Required IDEs**
   - Download and install [IntelliJ IDEA](https://www.jetbrains.com/idea/) for backend development
   - Download and install [Visual Studio Code](https://code.visualstudio.com/) for frontend development
   - Download and install [Docker Compose](https://docs.docker.com/compose/install/)

2. **Clone and Setup Backend Services**
   ```bash
   git clone https://github.com/your-username/ecommerce-microservices-platform.git
   cd ecommerce-microservices-platform/Microservices
   ```
   - Open the project in IntelliJ IDEA
   - Import all microservices as Maven projects
   - Run all Spring Boot services simultaneously from the IDE

3. **Setup AI Review Analysis Service**
   ```bash
   cd review-analysis-service
   pip install -r requirements.txt
   ```
   Create a `.env` file:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```
   Run the service:
   ```bash
   python app.py
   ```

4. **Setup Kafka and Zookeeper**
   ```bash
   cd ecommerce-microservices-platform/Microservices
   docker-compose up -d
   ```

5. **Setup ELK Stack**
   ```bash
   cd elk-docker-setup
   docker-compose up -d
   ```
   Access Kibana at http://localhost:5601/app/home to view and configure logs

6. **Setup Frontend**
   ```bash
   cd Frontend
   npm install
   npm start
   ```
   The application will be available at http://localhost:3000

### Monitoring and Logging
- Access Kibana dashboard at http://localhost:5601/app/home
- Configure custom visualizations and graphs in Kibana
- Monitor real-time logs and metrics
- Set up alerts and notifications

## 🔄 Service Interaction Flows with Kafka

### Order Processing Flow

1.  **User** initiates the process by sending a request to the **CartService** to add an item.
2.  **User** proceeds to checkout, sending a request to the **CartService**.
3.  The **CartService** sends a request to the **OrderService** to place the order (via REST API).
4.  The **OrderService** saves the new order details to the **Order DB**.
5.  The **OrderService** publishes an "order-placed" event to **Kafka**.
6.  **Kafka** delivers the event to the **ProductService**, which consumes it.
7.  The **ProductService** updates the stock quantity for the item in the **Product DB**.

### Order Cancellation Flow

1.  **User** initiates the cancellation by sending a request to the **OrderService**.
2.  The **OrderService** updates the order status to 'cancelled' in the **Order DB**.
3.  The **OrderService** publishes an "order-cancelled" event to **Kafka**.
4.  **Kafka** delivers the event to the **ProductService**, which consumes it.
5.  The **ProductService** increments the stock quantity for the cancelled item in the **Product DB**.

### Review Analysis Flow

1. **User** submits a review through the **Product Service**
2. **Product Service** sends the review to the **Review Analysis Service**
3. **Review Analysis Service** processes the review using Google's Gemini AI
4. Analysis results are returned to the **Product Service**
5. If the review is valid, it's saved to the database
6. If invalid, a 400 Bad Request is returned with analysis details

## 📊 Monitoring and Logging

### ELK Stack Integration
- **Centralized Logging**: All microservices logs are collected and processed
- **Logstash Configuration**: Custom patterns for structured logging
- **Elasticsearch**: Efficient log storage and indexing
- **Kibana**: Real-time log visualization and analysis
- **Logback Integration**: Structured logging with Logstash appender

![ELK Stack Integration](Images/elk.jpg)

### Monitoring Features in kibana
- Real-time log streaming
- Custom dashboards for different services
- Authentication event tracking
- Performance metrics visualization
- Error tracking and alerting

### Review Analysis Features

- **Multiple Analysis Categories**:
  - Direct Relevance
  - Content Quality
  - Inappropriate Content Detection
  - Review Structure Analysis

- **Comprehensive Response Structure**:
  ```json
  {
      "is_relevant": true/false,
      "message": "Overall analysis explanation",
      "analysis": {
          "direct_relevance": "Explanation of relevance",
          "content_quality": "Explanation of content quality",
          "inappropriate_content": "Explanation of inappropriate content",
          "review_structure": "Explanation of review structure"
      }
  }
  ```

### Test Cases for AI Review Analysis

Here are some example test cases demonstrating the AI service's ability to analyze reviews:

1. **Valid Product Review**
   ```json
   {
     "product_title": "Premium Almonds",
     "product_description": "Organic, handpicked almonds rich in nutrients and flavor",
     "review": "These almonds are really good"
   }
   ```
   Response:
   ```json
   {
     "is_relevant": true,
     "message": "The review is related to the product as it expresses a general positive sentiment towards \"Premium Almonds\". However, it lacks detail and provides no specific information about the taste, quality, or benefits. It doesn't contain any inappropriate content."
   }
   ```

2. **Spam Review**
   ```json
   {
     "product_title": "Premium Almonds",
     "product_description": "Organic, handpicked almonds rich in nutrients and flavor",
     "review": "Get awesome mobile cover at 50% off – link inside!"
   }
   ```
   Response:
   ```json
   {
     "is_relevant": false,
     "message": "The review is not relevant to the product Premium Almonds. It's promoting a mobile accessory with a suspicious link, indicating it is likely spam."
   }
   ```

3. **Inappropriate Content**
   ```json
   {
     "product_title": "Premium Almonds",
     "product_description": "Organic, handpicked almonds rich in nutrients and flavor",
     "review": "racial slur"
   }
   ```
   Response:
   ```json
   {
     "is_relevant": false,
     "message": "The review is completely unrelated to the product Premium Almonds. It contains highly inappropriate and offensive language and does not provide any relevant feedback. Such content is not acceptable."
   }
   ```

### 📈 Performance Optimizations recommendations

- Redis caching for frequently accessed data
- Asynchronous processing with Kafka
- Database indexing and query optimization
- Load balancing and horizontal scaling
- Optimized logging with Logback

## 🔐 Security Features

- JWT-based authentication
- Role-based access control

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 📚 API Documentation

Explore the API endpoints for each microservice using our Postman collections. These collections provide ready-to-use requests for testing and understanding the functionalities of the platform's backend services.

- 🔐 **User Service API**: [View Collection](https://github.com/Jeethanxx01/Microservice-E-commerce-platform/blob/main/Postman_api_collections/user%20Microservice.postman_collection.json)
- 🛍️ **Product Service API**: [View Collection](https://github.com/Jeethanxx01/Microservice-E-commerce-platform/blob/main/Postman_api_collections/product-service.postman_collection.json)
- 🛒 **Cart Service API**: [View Collection](https://github.com/Jeethanxx01/Microservice-E-commerce-platform/blob/main/Postman_api_collections/cart_service.postman_collection.json)
- 💳 **Order Service API**: [View Collection](https://github.com/Jeethanxx01/Microservice-E-commerce-platform/blob/main/Postman_api_collections/order-service.postman_collection.json)
- 📝 **Review Analysis API**: [View Collection](https://github.com/Jeethanxx01/Microservice-E-commerce-platform/blob/main/Postman_api_collections/review-analysis-service.postman_collection.json)

To use these collections, you'll need to have Postman installed. Simply import the JSON files into your Postman workspace.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

- **Jeethan Joel Crasta**-  [GitHub](https://github.com/Jeethanxx01)