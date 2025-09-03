package com.bookshop.pahana.repository;

import com.bookshop.pahana.entity.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {

    // Custom query method to find an Admin by email
    Optional<Admin> findByEmail(String email);
}
