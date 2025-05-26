package com.Bites.cart_service.entity;

import java.io.Serializable;

public class ShipmentDetails implements Serializable {

    private String name;
    private String mobileNumber;
    private String email;
    private String address;
    private String additionalDeliveryDetails;
    private String paymentMethod;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAdditionalDeliveryDetails() {
        return additionalDeliveryDetails;
    }

    public void setAdditionalDeliveryDetails(String additionalDeliveryDetails) {
        this.additionalDeliveryDetails = additionalDeliveryDetails;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
