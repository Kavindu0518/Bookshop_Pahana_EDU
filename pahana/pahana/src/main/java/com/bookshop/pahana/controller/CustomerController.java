package com.bookshop.pahana.controller;

import com.bookshop.pahana.entity.Customers;
import com.bookshop.pahana.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173") // Adjust CORS if needed
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public ResponseEntity<Customers> addCustomer(@RequestBody Customers customer) {
        Customers savedCustomer = customerService.addCustomer(customer);
        return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
    }



    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestParam("email") String email,
                                                     @RequestParam("password") String password) {
        Optional<Customers> customer = customerService.findCustomerByEmail(email);
        Map<String, Object> response = new HashMap<>();

        if (customer.isPresent()) {
            if (customer.get().getPassword().equals(password)) {
                // Create response with user data
                response.put("success", true);
                response.put("message", "Login successful");
                response.put("userId", customer.get().getId());
                response.put("userEmail", customer.get().getEmail());
                response.put("userName", customer.get().getName());
                // Add other user fields as needed

                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "Invalid password");
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        } else {
            response.put("success", false);
            response.put("message", "Customer not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public List<Customers> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customers> getCustomerById(@PathVariable("id") String id) {
        try {
            System.out.println("Fetching customer with ID: " + id);  // Log the incoming ID
            Optional<Customers> customer = customerService.getCustomerById(id);

            if (customer.isPresent()) {
                System.out.println("Customer found: " + customer.get());  // Log the customer data
                return new ResponseEntity<>(customer.get(), HttpStatus.OK);
            } else {
                System.out.println("No customer found with ID: " + id);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // No customer found
            }
        } catch (Exception e) {
            // Log the error (e.g., using a logging framework like SLF4J)
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);  // General server error
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Customers> updateCustomer(@PathVariable("id") String id, @RequestBody Customers customer) {
        Optional<Customers> existingCustomer = customerService.getCustomerById(id);
        if (existingCustomer.isPresent()) {
            Customers updatedCustomer = existingCustomer.get();
            updatedCustomer.setName(customer.getName());
            updatedCustomer.setEmail(customer.getEmail());
            updatedCustomer.setPassword(customer.getPassword());
            updatedCustomer.setContactNumber(customer.getContactNumber());

            Customers savedCustomer = customerService.updateCustomer(id, updatedCustomer);
            return new ResponseEntity<>(savedCustomer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable("id") String id) {
        customerService.deleteCustomer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
