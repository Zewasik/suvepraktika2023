package com.cgi.library.service;

import com.cgi.library.entity.Book;
import com.cgi.library.entity.User;
import com.cgi.library.model.BookDTO;
import com.cgi.library.model.BookStatus;
import com.cgi.library.repository.BookRepository;
import com.cgi.library.repository.BookSpecifications;
import com.cgi.library.repository.SpecificationBuilder;
import com.cgi.library.repository.UserRepository;
import com.cgi.library.util.ModelMapperFactory;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    //title, author, year, genre, filter
    public Page<BookDTO> getBooks(Pageable pageable, String title, String author, String genre, Integer year, BookStatus filter) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        SpecificationBuilder<Book> spec = new SpecificationBuilder<>();
        if (title != null) {
            spec.add(BookSpecifications.titleContainsCaseInsensitive(title));
        }
        if (author != null) {
            spec.add(BookSpecifications.authorContainsCaseInsensitive(author));
        }
        if (genre != null) {
            spec.add(BookSpecifications.genreContainsCaseInsensitive(genre));
        }
        if (year != null) {
            spec.add(BookSpecifications.yearContains(year));
        }
        if (filter != null) {
            spec.add(BookSpecifications.hasStatus(filter));
        }

        return bookRepository
                .findAll(spec.build(), pageable)
                .map(book -> modelMapper.map(book, BookDTO.class));
    }

    public BookDTO getBook(UUID bookId) {
        Book book = bookRepository.getOne(bookId);
        return ModelMapperFactory.getMapper().map(book, BookDTO.class);
    }

    public UUID saveBook(BookDTO bookDTO) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        return bookRepository.save(modelMapper.map(bookDTO, Book.class)).getId();
    }

    public BookDTO updateBook(UUID bookId, Map<String, Object> fields) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            fields.forEach((k, v) -> {
                Field field = ReflectionUtils.findField(Book.class, k);
                if (field != null) {
                    field.setAccessible(true);
                    ReflectionUtils.setField(field, book, v);
                }
            });
            bookRepository.save(book);
            return modelMapper.map(book, BookDTO.class);
        }
        return null;
    }

    public void deleteBook(UUID bookId) {
        bookRepository.deleteById(bookId);
    }

    public void likeBook(UUID bookId, User user) {
        System.out.println(user.getUsername());

//        bookRepository.findById(bookId).ifPresent(book -> {
//            user.getLikedBooks().add(book);
//            userRepository.save(user);
//        });
    }
}
