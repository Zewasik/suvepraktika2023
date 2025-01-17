package com.cgi.library.controller;

import com.cgi.library.entity.User;
import com.cgi.library.model.BookDTO;
import com.cgi.library.model.BookStatus;
import com.cgi.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping(value = "getBooks")
    public ResponseEntity<Page<BookDTO>> getBooks(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "author", required = false) String author,
            @RequestParam(value = "year", required = false) Integer year,
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "size", required = false) Integer size,
//            @RequestParam(value = "sort", required = false) String sort,
//            @RequestParam(value = "order", required = false) String order,
            @RequestParam(value = "filter", required = false) BookStatus filter) {
        PageRequest pr = PageRequest.of(page == null || page < 0 ? 0 : page, size == null || size < 1 ? 20 : size);

//        if (sort != null) {
//            Sort s = Sort.by(sort);
//            if (order == "DESC") {
//                s.descending();
//            } else {
//                s.ascending();
//            }
//            pr.withSort(s);
//        }
        return ResponseEntity.ok(bookService.getBooks(pr, title, author, genre, year, filter));
    }

    @GetMapping(value = "getBook")
    public ResponseEntity<BookDTO> getBook(@RequestParam(value = "bookId") UUID bookId) {
        return ResponseEntity.ok(bookService.getBook(bookId));
    }

    @PostMapping(value = "saveBook")
    public ResponseEntity<String> saveBook(@RequestBody BookDTO book) {

        return ResponseEntity.ok(String.valueOf(bookService.saveBook(book)));
    }

    @PatchMapping(value = "updateBook")
    public ResponseEntity<BookDTO> updateBook(@RequestParam(value = "bookId") UUID bookId, @RequestBody Map<String, Object> fields) {
        return Optional
                .ofNullable(bookService.updateBook(bookId, fields))
                .map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.notFound()::build);
    }

    @PostMapping(value = "likeBook")
    public void likeBook(Authentication authentication, @RequestParam(value = "bookId") UUID bookId) {
        User user = (User) authentication.getPrincipal();
        bookService.likeBook(bookId, user);
    }

    @DeleteMapping(value = "deleteBook")
    public ResponseEntity<String> deleteBook(@RequestParam(value = "bookId") UUID bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.ok("");
    }
}
