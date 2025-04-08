package com.Bites.cart_service.Controller;

import com.Bites.cart_service.Service.CartService;
import com.Bites.cart_service.Service.UserService;
import com.Bites.cart_service.dtos.UserDto;
import com.Bites.cart_service.entity.Cart;
import com.Bites.cart_service.entity.ShipmentDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @PostMapping("/add/{itemId}/{quantity}")
    public Cart addToCart(@PathVariable String itemId,@PathVariable Integer quantity,
                          @RequestHeader("Authorization") String jwt) {

        if (jwt == null || jwt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Session expired, please log in again.");
        }

        UserDto user = userService.getUserProfileHandler(jwt);

        return cartService.addToCart(user.getCartId(),user.getEmail(),user.getFullName(), itemId,quantity);
    }

    @DeleteMapping("/remove/{itemId}")
    public Cart removeFromCart(@PathVariable String itemId,
                               @RequestHeader("Authorization") String jwt) {

        if (jwt == null || jwt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Session expired, please log in again.");
        }

        UserDto user = userService.getUserProfileHandler(jwt);

        return cartService.removeFromCart(user.getCartId(), itemId);
    }

    @GetMapping()
    public Optional<Cart> getCart(@RequestHeader("Authorization") String jwt) {

        if (jwt == null || jwt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Session expired, please log in again.");
        }

        UserDto user = userService.getUserProfileHandler(jwt);

        return cartService.getCart(user.getCartId());
    }

    @DeleteMapping()
    public void clearCart(@RequestHeader("Authorization") String jwt) {
        if (jwt == null || jwt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Session expired, please log in again.");
        }

        UserDto user = userService.getUserProfileHandler(jwt);
        cartService.clearCart(user.getCartId());
    }

    @PostMapping("/addshipmentdetails")
    public Cart addShipmentDetails(@RequestBody ShipmentDetails shipmentDetails,@RequestHeader("Authorization") String jwt) {
        if (jwt == null || jwt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Session expired, please log in again.");
        }

        UserDto user = userService.getUserProfileHandler(jwt);
        String name=shipmentDetails.getName();
        String mobileNumber=shipmentDetails.getMobileNumber();
        String email=shipmentDetails.getEmail();
        String address=shipmentDetails.getAddress();
        String additionalDeliveryDetails=shipmentDetails.getAdditionalDeliveryDetails();
        String paymentMethod=shipmentDetails.getPaymentMethod();

        // Call the service method to add shipment details
        return cartService.addShipmentDetails(user.getCartId(), name, mobileNumber, email, address, additionalDeliveryDetails, paymentMethod);
    }


}
