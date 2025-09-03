package com.bookshop.pahana.controller;

import com.bookshop.pahana.entity.Admin;
import com.bookshop.pahana.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "http://localhost:5173") // Adjust this to match your frontend's domain
public class AdminController {

    @Autowired
    private AdminService adminService;

    // POST: Add a new admin
    @PostMapping
    public ResponseEntity<Admin> addAdmin(@RequestParam("adminName") String adminName,
                                          @RequestParam("email") String email,
                                          @RequestParam("password") String password) {
        Admin admin = new Admin();
        admin.setAdminName(adminName);
        admin.setEmail(email);
        admin.setPassword(password);

        Admin savedAdmin = adminService.addAdmin(admin);
        return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
    }

    // POST: Login admin with email and password
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam("email") String email, @RequestParam("password") String password) {
        Optional<Admin> admin = adminService.findAdminByEmail(email);
        if (admin.isPresent()) {
            // Check if the password matches (Assuming plain text comparison for now, but hash in production)
            if (admin.get().getPassword().equals(password)) {
                return new ResponseEntity<>("Login successful", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid password", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Admin not found", HttpStatus.NOT_FOUND);
        }
    }

    // GET: Get all admins
    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminService.getAllAdmins();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    // GET: Get admin by ID
    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable("id") String id) {
        Optional<Admin> admin = adminService.getAdminById(id);
        return admin.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // PUT: Update admin by ID
    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable("id") String id, @RequestParam("adminName") String adminName,
                                             @RequestParam("email") String email, @RequestParam("password") String password) {
        Optional<Admin> existingAdmin = adminService.getAdminById(id);
        if (existingAdmin.isPresent()) {
            Admin updatedAdmin = existingAdmin.get();
            updatedAdmin.setAdminName(adminName);
            updatedAdmin.setEmail(email);
            updatedAdmin.setPassword(password);

            Admin savedAdmin = adminService.updateAdmin(id, updatedAdmin);
            return new ResponseEntity<>(savedAdmin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE: Delete admin by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable("id") String id) {
        adminService.deleteAdmin(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
