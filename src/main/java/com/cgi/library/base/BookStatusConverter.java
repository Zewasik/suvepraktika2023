package com.cgi.library.base;

import com.cgi.library.model.BookStatus;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class BookStatusConverter implements Converter<String, BookStatus> {
    @Override
    public BookStatus convert(String value) {
        try {
            return BookStatus.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}