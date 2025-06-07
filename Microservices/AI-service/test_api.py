import requests
import json

def test_review_analysis():
    url = "http://localhost:5000/analyze_review"
    headers = {"Content-Type": "application/json"}
    
    # Test case 1: Valid review
    test1 = {
        "product_title": "Smartphone X",
        "product_description": "Latest smartphone with advanced features",
        "review": "This product is good"
    }
    
    # Test case 2: Spam review
    test2 = {
        "product_title": "Smartphone X",
        "product_description": "Latest smartphone with advanced features",
        "review": "Get awesome tshirt on 50% offer link here"
    }
    
    # Test case 3: Inappropriate review
    test3 = {
        "product_title": "Smartphone X",
        "product_description": "Latest smartphone with advanced features",
        "review": "Inappropriate review"
    }
    
    test_cases = [
        ("Valid Review", test1),
        ("Spam Review", test2),
        ("Inappropriate Review", test3)
    ]
    
    for test_name, test_data in test_cases:
        print(f"\nTesting: {test_name}")
        print(f"Input: {json.dumps(test_data, indent=2)}")
        try:
            response = requests.post(url, headers=headers, json=test_data)
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        except Exception as e:
            print(f"Error: {str(e)}")

if __name__ == "__main__":
    test_review_analysis() 