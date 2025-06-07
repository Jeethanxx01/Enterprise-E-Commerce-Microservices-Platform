from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure Google Bard API
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

def analyze_review(product_title, product_description, review):
    try:
        # Initialize the model
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        # Create the prompt for analysis
        prompt = f"""
        Analyze the following product review for relevance and appropriateness. Be thorough but fair in your analysis.

        Product Title: {product_title}
        Product Description: {product_description}
        Customer Review: {review}

        Perform a detailed analysis considering these aspects:
        1. Direct Relevance:
           - Does the review express a clear opinion about the product (positive or negative)?
           - Is the review focused on the product itself?
           - Even if brief, does it provide a clear sentiment about the product?
           - Does it contain mixed content (partially relevant but mostly off-topic)?

        2. Content Quality:
           - Is the review's sentiment clear and unambiguous?
           - Does it provide a direct opinion about the product?
           - Is it overly subjective without product-specific details?
           - Note: Brief reviews with clear opinions are acceptable

        3. Inappropriate Content:
           - Contains spam, self-promotion, or marketing links
           - Includes drug references or coded language
           - Contains offensive language, racial slurs, or hate speech
           - Includes personal attacks or harassment
           - Contains medical misinformation or exaggerated claims
           - Uses inappropriate metaphors or references
           - Contains off-topic personal stories or experiences

        4. Review Structure:
           - Is it a genuine product review or just a personal anecdote?
           - Does it mix product feedback with unrelated content?
           - Is it primarily focused on something other than the product?
           - Note: Simple, direct reviews are valid even if brief

        Important Guidelines:
        - Accept brief reviews that clearly express an opinion about the product
        - "Good product" or "Bad product" are valid reviews
        - Focus on whether the review is about the product, not its length
        - Reject only if the review is off-topic or inappropriate

        Return your analysis as a valid JSON object with these fields:
        {{
            "is_relevant": true/false,
            "message": "detailed explanation",
            "analysis": {{
                "direct_relevance": "explanation",
                "content_quality": "explanation",
                "inappropriate_content": "explanation",
                "review_structure": "explanation"
            }}
        }}
        """
        
        # Generate response
        response = model.generate_content(prompt)
        
        # Print raw response for debugging
        print("Raw model response:", response.text)
        
        # Parse the response as JSON
        try:
            # Remove ```json wrapper if present
            response_text = response.text.strip()
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            result = json.loads(response_text.strip())
        except json.JSONDecodeError:
            result = {
                "is_relevant": False, 
                "message": "Invalid response from model",
                "analysis": {
                    "direct_relevance": "Error in analysis",
                    "content_quality": "Error in analysis",
                    "inappropriate_content": "Error in analysis",
                    "review_structure": "Error in analysis"
                }
            }
        
        return result
        
    except Exception as e:
        return {
            "is_relevant": False, 
            "message": f"Error analyzing review: {str(e)}",
            "analysis": {
                "direct_relevance": "Error in analysis",
                "content_quality": "Error in analysis",
                "inappropriate_content": "Error in analysis",
                "review_structure": "Error in analysis"
            }
        }

@app.route('/analyze_review', methods=['POST'])
def analyze_review_endpoint():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['product_title', 'product_description', 'review']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    "error": f"Missing required field: {field}"
                }), 400
        
        # Get data from request
        product_title = data['product_title']
        product_description = data['product_description']
        review = data['review']
        
        # Analyze the review
        result = analyze_review(product_title, product_description, review)
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            "error": f"An error occurred: {str(e)}"
        }), 500

if __name__ == '__main__':
    app.run(debug=True) 