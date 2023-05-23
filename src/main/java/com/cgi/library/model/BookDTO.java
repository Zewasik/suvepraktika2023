package com.cgi.library.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Setter
@Getter
public class BookDTO {

    private UUID id;
    private String title;
    private String author;
    private String genre;
    private int year;
    private LocalDate added;
    private int checkOutCount;
    private BookStatus status;
    private LocalDate dueDate;
    private String comment;
}
