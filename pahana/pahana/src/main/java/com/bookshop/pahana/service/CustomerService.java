


package com.bookshop.pahana.service;

import com.bookshop.pahana.entity.Customers;
import com.bookshop.pahana.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customers addCustomer(Customers customer) {
        return customerRepository.save(customer);
    }

    public List<Customers> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customers> getCustomerById(String id) {
        return customerRepository.findById(id);
    }

    public Optional<Customers> findCustomerByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    public Customers updateCustomer(String id, Customers updatedCustomer) {
        updatedCustomer.setId(id);
        return customerRepository.save(updatedCustomer);
    }

    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }
}
