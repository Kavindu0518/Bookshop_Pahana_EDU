package com.bookshop.pahana.service;

import com.bookshop.pahana.entity.Admin;
import com.bookshop.pahana.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    // Constructor injection of AdminRepository
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    // Method to add a new admin
    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);  // Save the admin to MongoDB
    }

    // Method to get all admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();  // Retrieve all admins from the database
    }

    // Method to get an admin by ID
    public Optional<Admin> getAdminById(String id) {
        return adminRepository.findById(id);  // Retrieve an admin by their unique ID
    }

    // Method to find an admin by email (for login)
    public Optional<Admin> findAdminByEmail(String email) {
        return adminRepository.findByEmail(email);  // Find an admin by email
    }

    // Method to update an admin by ID
    public Admin updateAdmin(String id, Admin updatedAdmin) {
        // If the admin exists, update their information and return the updated admin
        updatedAdmin.setId(id);
        return adminRepository.save(updatedAdmin);  // Save the updated admin to MongoDB
    }

    // Method to delete an admin by ID
    public void deleteAdmin(String id) {
        adminRepository.deleteById(id);  // Delete the admin from the database
    }
}
