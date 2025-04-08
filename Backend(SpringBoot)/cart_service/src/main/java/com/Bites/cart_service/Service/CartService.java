package com.Bites.cart_service.Service;

import com.Bites.cart_service.Repository.CartRepository;
import com.Bites.cart_service.dtos.ProductDto;
import com.Bites.cart_service.entity.Cart;
import com.Bites.cart_service.entity.Product;
import com.Bites.cart_service.entity.ShipmentDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductService productService;


    public Cart addToCart(String cartId, String email, String fullName, String itemId, Integer quantity) {
        // Fetch product details from Product Service
        ProductDto productDto = productService.getProductById(itemId)
                .orElseThrow(() -> new RuntimeException("Product not found!"));

        // Convert ProductDto to Product entity and set quantity
        Product product = convertToProduct(productDto);
        product.setQuantity(quantity);
        product.setPrice((quantity*product.getPrice()/100));

        // Retrieve or create a new cart
        Cart cart = cartRepository.findById(cartId)
                .orElseGet(() -> new Cart(cartId, email, fullName, new ArrayList<>()));

        // Assign a new order ID and add the product
        cart.setOrderId(UUID.randomUUID().toString());
        Double amount = product.getPrice();
        Double totalAmount = (cart.getTotalAmount() != null ? cart.getTotalAmount() : 0.0) + amount;
        cart.setTotalAmount(totalAmount);
        cart.addProduct(product);

        // Save and return the updated cart
        return cartRepository.save(cart);
    }


    // Helper method to convert ProductDto to Product
    private Product convertToProduct(ProductDto dto) {
        return new Product(dto.getId(), dto.getName(), dto.getDescription(),
                dto.getPrice(), dto.getStock(), dto.getImageUrl());
    }


    public Cart removeFromCart(String cartId, String itemId) {
        // Fetch the cart or throw an exception if not found
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart not found."));

        // Get the list of products (mutable)
        List<Product> products = new ArrayList<>(cart.getProducts());

        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getId().equals(itemId)) {
                products.remove(i); // Remove only the first match
                break; // Exit loop after removing one occurrence
            }
        }

        // Set the updated products list back to the cart
        cart.setProducts(products);

        // Save the updated cart to persist changes
        return cartRepository.save(cart);
    }


    public Optional<Cart> getCart(String cartId) {
        return cartRepository.findById(cartId);
    }

    public void clearCart(String cartId) {
        cartRepository.deleteById(cartId);
    }

    public Cart addShipmentDetails(String cartId, String name, String mobileNumber, String email, String address, String additionalDeliveryDetails, String paymentMethod) {
        // Retrieve the Cart from Redis by its cartId
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart not found."));

        // Create a new ShipmentDetails object and set the values
        ShipmentDetails shipmentDetails = new ShipmentDetails();
        shipmentDetails.setName(name);
        shipmentDetails.setMobileNumber(mobileNumber);
        shipmentDetails.setEmail(email);
        shipmentDetails.setAddress(address);
        shipmentDetails.setAdditionalDeliveryDetails(additionalDeliveryDetails);
        shipmentDetails.setPaymentMethod(paymentMethod);

        // Set the shipment details in the cart
        cart.setShipmentDetails(shipmentDetails);

        // Save the updated Cart back to Redis


        return cartRepository.save(cart);
    }





}
