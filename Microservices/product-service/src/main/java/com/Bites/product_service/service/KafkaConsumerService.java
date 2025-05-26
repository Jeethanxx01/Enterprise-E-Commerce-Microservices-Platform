package com.Bites.product_service.service;

import com.Bites.product_service.Repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class KafkaConsumerService {

    private static final Logger logger = LoggerFactory.getLogger(KafkaConsumerService.class);
    private final ProductRepository productRepository;

    public KafkaConsumerService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @KafkaListener(topics = "product-quantities", groupId = "product-service-group")
    public void updateProductStock(@Payload Map<String, Integer> productQuantities,
                                 @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
                                 @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
                                 @Header(KafkaHeaders.OFFSET) long offset) {
        try {
            logger.info("Received order placement message from topic: {}, partition: {}, offset: {}", topic, partition, offset);
            logger.info("Processing product quantities for order placement: {}", productQuantities);

            productQuantities.forEach((productId, quantity) -> {
                try {
                    productRepository.findById(productId).ifPresent(product -> {
                        int currentStock = product.getStock();
                        int newStock = currentStock - quantity;
                        
                        if (newStock >= 0) {
                            product.setStock(newStock);
                            productRepository.save(product);
                            logger.info("Updated stock for product {}: {} -> {}", productId, currentStock, newStock);
                        } else {
                            logger.warn("Insufficient stock for product {}: requested {}, available {}", 
                                    productId, quantity, currentStock);
                        }
                    });
                } catch (Exception e) {
                    logger.error("Error processing product {}: {}", productId, e.getMessage(), e);
                }
            });
        } catch (Exception e) {
            logger.error("Error processing Kafka message: {}", e.getMessage(), e);
        }
    }

    @KafkaListener(topics = "product-quantities-cancelled", groupId = "product-service-group")
    public void handleOrderCancellation(@Payload Map<String, Integer> productQuantities,
                                      @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
                                      @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
                                      @Header(KafkaHeaders.OFFSET) long offset) {
        try {
            logger.info("Received order cancellation message from topic: {}, partition: {}, offset: {}", topic, partition, offset);
            logger.info("Processing product quantities for order cancellation: {}", productQuantities);

            productQuantities.forEach((productId, quantity) -> {
                try {
                    productRepository.findById(productId).ifPresent(product -> {
                        int currentStock = product.getStock();
                        int newStock = currentStock + quantity;
                        
                        product.setStock(newStock);
                        productRepository.save(product);
                        logger.info("Restored stock for product {}: {} -> {}", productId, currentStock, newStock);
                    });
                } catch (Exception e) {
                    logger.error("Error processing product cancellation {}: {}", productId, e.getMessage(), e);
                }
            });
        } catch (Exception e) {
            logger.error("Error processing Kafka cancellation message: {}", e.getMessage(), e);
        }
    }
} 