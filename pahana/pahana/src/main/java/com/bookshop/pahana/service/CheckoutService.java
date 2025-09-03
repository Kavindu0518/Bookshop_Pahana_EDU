package com.bookshop.pahana.service;

import com.bookshop.pahana.entity.Checkout;
import com.bookshop.pahana.repository.CheckoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CheckoutService {

    @Autowired
    private CheckoutRepository checkoutRepository;

    // Save checkout data in the database
    public Checkout saveCheckout(Checkout checkout) {
        return checkoutRepository.save(checkout);
    }

    // Fetch all checkout data from the database
    public List<Checkout> getAllCheckouts() {
        return checkoutRepository.findAll();
    }


    // Delete checkout data by ID with error handling
    public void deleteCheckoutById(String id) {  // Accept String id instead of Long
        if (checkoutRepository.existsById(id)) {  // Check if entity exists
            checkoutRepository.deleteById(id);
        } else {
            throw new RuntimeException("Order not found with id " + id);  // Custom exception if not found
        }
    }
}
