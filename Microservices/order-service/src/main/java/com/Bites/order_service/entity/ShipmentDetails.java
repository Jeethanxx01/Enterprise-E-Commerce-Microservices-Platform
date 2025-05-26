package com.Bites.order_service.entity;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "shipmentDetails")
public class ShipmentDetails {
    private String name;
    private String mobileNumber;
    private String email;
    private String address;
    private String additionalDeliveryDetails;
    private String paymentMethod;

    public ShipmentDetails() {
    }

    public ShipmentDetails(String name, String mobileNumber, String email, String address,
                           String additionalDeliveryDetails, String paymentMethod) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.address = address;
        this.additionalDeliveryDetails = additionalDeliveryDetails;
        this.paymentMethod = paymentMethod;
    }

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

    @Override
    public String toString() {
        return "ShipmentDetails{" +
                "name='" + name + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", additionalDeliveryDetails='" + additionalDeliveryDetails + '\'' +
                ", paymentMethod='" + paymentMethod + '\'' +
                '}';
    }
}
