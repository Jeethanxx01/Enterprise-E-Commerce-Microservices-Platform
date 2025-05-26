package com.Bites.order_service.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, Map<String, Integer>> kafkaTemplate;
    private static final String ORDER_PLACED_TOPIC = "product-quantities";
    private static final String ORDER_CANCELLED_TOPIC = "product-quantities-cancelled";

    public KafkaProducerService(KafkaTemplate<String, Map<String, Integer>> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendProductQuantities(Map<String, Integer> productQuantities) {
        kafkaTemplate.send(ORDER_PLACED_TOPIC, productQuantities);
    }

    public void sendOrderCancellationQuantities(Map<String, Integer> productQuantities) {
        kafkaTemplate.send(ORDER_CANCELLED_TOPIC, productQuantities);
    }
} 