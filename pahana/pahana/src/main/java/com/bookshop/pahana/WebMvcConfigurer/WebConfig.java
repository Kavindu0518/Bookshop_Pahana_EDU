package com.bookshop.pahana.WebMvcConfigurer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow cross-origin requests for all endpoints (e.g., "/api/books")
        registry.addMapping("/api/**") // Specify path pattern (you can adjust as needed)
                .allowedOrigins("http://localhost:5173") // Replace with the front-end URL (e.g., React app running on port 3000)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Specify the allowed HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials (e.g., cookies or authorization headers)
    }
}
