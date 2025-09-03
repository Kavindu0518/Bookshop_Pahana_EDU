package com.bookshop.pahana.controller;

import com.bookshop.pahana.entity.Checkout;
import com.bookshop.pahana.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = "http://localhost:5173")  // Allow requests from your frontend
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    // Handle checkout and save data to the database
    @PostMapping
    public ResponseEntity<Checkout> placeOrder(@RequestBody Checkout checkout) {
        Checkout savedCheckout = checkoutService.saveCheckout(checkout);
        return new ResponseEntity<>(savedCheckout, HttpStatus.CREATED);
    }

    // Fetch all checkouts from the database
    @GetMapping
    public ResponseEntity<List<Checkout>> getAllCheckouts() {
        List<Checkout> checkouts = checkoutService.getAllCheckouts();
        return new ResponseEntity<>(checkouts, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCheckout(@PathVariable String id) {  // Change to String
        checkoutService.deleteCheckoutById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
