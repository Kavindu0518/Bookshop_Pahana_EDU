package com.bookshop.pahana.controller;

import com.bookshop.pahana.entity.Book;
import com.bookshop.pahana.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Book> addBook(
            @RequestParam("author") String author,
            @RequestParam("title") String title,
            @RequestParam("price") Double price,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam("language") String language,
            @RequestParam("category") String category,
            @RequestParam("publisher") String publisher) {

        try {
            Book book = new Book();
            book.setAuthor(author);
            book.setTitle(title);
            book.setPrice(price);
            book.setDescription(description);
            book.setLanguage(language);
            book.setCategory(category);
            book.setPublisher(publisher);

            Book savedBook = bookService.addBook(book, imageFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
        } catch (IOException e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error processing image file",
                    e
            );
        }
    }
    // Endpoint to serve images
    @GetMapping("/uploads/{imageName}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String imageName) {
        try {
            FileSystemResource resource = bookService.getImage(imageName);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);  // Change to MediaType based on your image format
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found", e);
        }
    }



    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable("id") String id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Book not found with id: " + id
                ));
    }

//    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<Book> updateBook(
//            @PathVariable("id") String id,
//            @RequestParam("author") String author,
//            @RequestParam("title") String title,
//            @RequestParam("price") Double price,
//            @RequestParam("description") String description,
//            @RequestParam(value = "image", required = false) MultipartFile imageFile,
//            @RequestParam("language") String language,
//            @RequestParam("category") String category,
//            @RequestParam("publisher") String publisher) {
//
//        try {
//            Book updatedBook = new Book();
//            updatedBook.setAuthor(author);
//            updatedBook.setTitle(title);
//            updatedBook.setPrice(price);
//            updatedBook.setDescription(description);
//            updatedBook.setLanguage(language);
//            updatedBook.setCategory(category);
//            updatedBook.setPublisher(publisher);
//
//            Book savedBook = bookService.updateBook(id, updatedBook, imageFile);
//            if (savedBook == null) {
//                throw new ResponseStatusException(
//                        HttpStatus.NOT_FOUND,
//                        "Book not found with id: " + id
//                );
//            }
//            return ResponseEntity.ok(savedBook);
//        } catch (IOException e) {
//            throw new ResponseStatusException(
//                    HttpStatus.INTERNAL_SERVER_ERROR,
//                    "Error processing image file",
//                    e
//            );
//        }
//    }


    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Book> updateBook(
            @PathVariable("id") String id,
            @RequestParam("author") String author,
            @RequestParam("title") String title,
            @RequestParam("price") Double price,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam("language") String language,
            @RequestParam("category") String category,
            @RequestParam("publisher") String publisher) {

        try {
            Book updatedBook = new Book();
            updatedBook.setAuthor(author);
            updatedBook.setTitle(title);
            updatedBook.setPrice(price);
            updatedBook.setDescription(description);
            updatedBook.setLanguage(language);
            updatedBook.setCategory(category);
            updatedBook.setPublisher(publisher);

            Book savedBook = bookService.updateBook(id, updatedBook, imageFile);
            if (savedBook == null) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Book not found with id: " + id
                );
            }
            return ResponseEntity.ok(savedBook);
        } catch (IOException e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error processing image file",
                    e
            );
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") String id) {
        try {
            bookService.deleteBook(id);
            return ResponseEntity.noContent().build();
        } catch (IOException e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error deleting book resources",
                    e
            );
        }
    }


    }
