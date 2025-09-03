package com.bookshop.pahana.repository;

import com.bookshop.pahana.entity.Customers;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends MongoRepository<Customers, String> {

    // Find customer by email
    Optional<Customers> findByEmail(String email);
}
