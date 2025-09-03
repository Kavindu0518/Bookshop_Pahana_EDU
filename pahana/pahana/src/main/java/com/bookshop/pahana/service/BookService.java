package com.bookshop.pahana.service;

import com.bookshop.pahana.entity.Book;
import com.bookshop.pahana.repository.BookRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class BookService {

    @Value("${file.upload-dir}")
    private String uploadDir;  // Should point to your upload directory (e.g., "uploads")

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Method to add a book with image upload
    public Book addBook(Book book, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            String imagePath = saveImage(imageFile);
            book.setImage(imagePath);
        }
        return bookRepository.save(book);
    }

    // Method to get all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Method to get a book by ID
    public Optional<Book> getBookById(String id) {
        return bookRepository.findById(id);
    }

    public Book updateBook(String id, Book updatedBook, MultipartFile imageFile) throws IOException {
        Optional<Book> existingBookOpt = bookRepository.findById(id);

        if (existingBookOpt.isPresent()) {
            Book existingBook = existingBookOpt.get();

            // Update fields
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setAuthor(updatedBook.getAuthor());
            existingBook.setDescription(updatedBook.getDescription());
            existingBook.setPrice(updatedBook.getPrice());
            existingBook.setCategory(updatedBook.getCategory());
            existingBook.setLanguage(updatedBook.getLanguage());
            existingBook.setPublisher(updatedBook.getPublisher());

            // Handle image update only if a new image is provided
            if (imageFile != null && !imageFile.isEmpty()) {
                // Delete old image if exists
                if (existingBook.getImage() != null) {
                    deleteImage(existingBook.getImage());
                }
                // Save new image
                String imagePath = saveImage(imageFile);
                existingBook.setImage(imagePath);
            }

            try {
                return bookRepository.save(existingBook);
            } catch (Exception e) {
                // Log the error if saving fails
                System.out.println("Error while updating book: " + e.getMessage());
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating book", e);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found with id: " + id);
        }
    }



    // Method to delete a book by ID
    public void deleteBook(String id) throws IOException {
        Optional<Book> bookOpt = bookRepository.findById(id);
        if (bookOpt.isPresent()) {
            Book book = bookOpt.get();
            // Delete associated image if exists
            if (book.getImage() != null) {
                deleteImage(book.getImage());
            }
            bookRepository.deleteById(id);
        }
    }

    // Helper method to save image file
    private String saveImage(MultipartFile imageFile) throws IOException {
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String fileName = System.currentTimeMillis() + "_" +
                Objects.requireNonNull(imageFile.getOriginalFilename())
                        .replace(" ", "_");

        // Save file
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return fileName; // Return just the filename to store in DB
    }

    // Helper method to delete image file
    private void deleteImage(String imageName) throws IOException {
        Path imagePath = Paths.get(uploadDir).resolve(imageName);
        if (Files.exists(imagePath)) {
            Files.delete(imagePath);
        }
    }

    // Helper method to get image path (for serving images)
    public Path getImagePath(String imageName) {
        return Paths.get(uploadDir).resolve(imageName);
    }



    // Get image path for serving images
    public FileSystemResource getImage(String imageName) {
        return new FileSystemResource(Paths.get(uploadDir).resolve(imageName).toFile());
    }
}


