# Product Review System

A microservices-based system for managing and analyzing product reviews. The system consists of two main services: a Product Service for managing reviews and a Review Analysis Service for validating review content.

## System Architecture

```
Product Review System
├── Product Service (Spring Boot)
│   ├── Review Management
│   ├── User Integration
│   └── Database Storage
└── Review Analysis Service (Flask)
    ├── AI-Powered Analysis
    ├── Content Validation
    └── Relevance Checking
```

## Review Analysis Service

### Overview
A Flask-based API that analyzes product reviews using Google's Gemini AI to determine if reviews are relevant to the product and appropriate. The system can detect various types of inappropriate content, including spam, offensive language, and off-topic reviews.

### Features
- **Review Analysis**: Analyzes product reviews for relevance and appropriateness
- **Multiple Analysis Categories**:
  - Direct Relevance
  - Content Quality
  - Inappropriate Content Detection
  - Review Structure Analysis
- **Comprehensive Response**: Returns detailed analysis with explanations
- **Handles Various Review Types**:
  - Simple, direct reviews (e.g., "Good product", "Bad product")
  - Detailed product reviews
  - Detects spam and inappropriate content
  - Identifies off-topic reviews

### Recent Changes
#### Version 2.0
- Enhanced review analysis with multiple categories
- Added detailed response structure with analysis breakdown
- Improved handling of brief but relevant reviews
- Added support for detecting:
  - Mixed content reviews
  - Coded language and references
  - Off-topic personal stories
  - Self-promotion and spam
  - Inappropriate metaphors

### Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI-service
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   Create a `.env` file in the project root:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

4. **Run the service**
   ```bash
   python app.py
   ```

### API Usage
#### Endpoint
```
POST http://localhost:5000/analyze_review
```

#### Request Format
```json
{
    "product_title": "Product Name",
    "product_description": "Product Description",
    "review": "Customer Review"
}
```

#### Response Format
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

## Product Service

### Overview
This microservice manages product reviews. It allows users to submit reviews for products, which are then analyzed for relevance and appropriateness before being saved.

### Recent Changes
- **Review Analysis Integration**: Before saving a review, the service sends the review to the Review Analysis Service to check if the review is relevant and appropriate.
- **Error Handling**: If the review is not relevant or contains inappropriate content, the service returns a 400 Bad Request with a detailed message from the analysis service.

### Flow
1. **Review Submission**:
   - A user submits a review along with a product ID and a JWT token.
   - The controller validates the JWT token and fetches the user's profile from the User Microservice.
   - The username is set on the review object.

2. **Review Analysis**:
   - The review is sent to the review analysis microservice (`http://localhost:5000/analyze_review`).
   - The analysis service checks the review for relevance and appropriateness.
   - If the review is not relevant or inappropriate, the service throws a `RuntimeException` with a message.

3. **Error Handling**:
   - If the review is rejected, the controller catches the `RuntimeException` and returns a 400 Bad Request with the error message.
   - If the review is accepted, it is saved in the database and associated with the product.

### Dependencies
- Spring Boot
- Spring Cloud OpenFeign (for HTTP client)
- MongoDB (for data storage)

### Configuration
- Ensure the review analysis microservice is running at `http://localhost:5000`.
- The service uses Feign clients to communicate with the analysis microservice.

## Analysis Categories

### 1. Direct Relevance
- Checks if the review focuses on the product
- Evaluates if the opinion is clear (positive or negative)
- Accepts brief but relevant reviews
- Detects mixed content

### 2. Content Quality
- Evaluates review clarity
- Checks for clear sentiment
- Accepts simple, direct opinions
- Identifies overly subjective content

### 3. Inappropriate Content
- Spam and self-promotion
- Drug references
- Offensive language
- Personal attacks
- Medical misinformation
- Inappropriate metaphors
- Off-topic content

### 4. Review Structure
- Genuine product review vs personal anecdote
- Mixed content detection
- Focus on product relevance

## Testing

### Review Analysis Service
```bash
python test_api.py
```

### Product Service
- Test the review submission flow by sending a POST request to `/api/reviews` with a review, product ID, and JWT token.
- Verify that inappropriate or irrelevant reviews are rejected with a 400 Bad Request.

## Error Handling

The system includes comprehensive error handling for:
- Missing required fields
- Invalid JSON responses
- API errors
- Model response parsing errors
- JWT validation errors
- Database operation errors

## Development

### Debug Mode
The Review Analysis Service runs in debug mode by default. For production:
1. Set `debug=False` in `app.py`
2. Use a production WSGI server

## Dependencies

### Review Analysis Service
- Flask==2.3.3
- python-dotenv==1.0.0
- google-generativeai==0.3.1
- requests==2.31.0

### Product Service
- Spring Boot
- Spring Cloud OpenFeign
- MongoDB

## Future Improvements
- Add more detailed logging and monitoring
- Implement rate limiting for review submissions
- Enhance error messages and response formats
- Add caching for frequently analyzed reviews
- Implement batch processing for multiple reviews
- Add support for multiple languages
- Implement review sentiment analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 