package com.cgi.library.entity;

import com.cgi.library.model.BookStatus;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "book")
public class Book {

    @Id
    @Column
    @Type(type="uuid-char")
    private UUID id;

    @Column
    private String title;

    @Column
    private String author;

    @Column
    private String genre;

    @Column
    private Integer year;

    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate added;

    @Column(name = "check_out_count")
    private Integer checkOutCount;

    @Column
    @Enumerated(EnumType.STRING)
    private BookStatus status;

    @Column(name = "due_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    @Column
    private String comment;

    @OneToMany(mappedBy = "borrowedBook")
    private List<CheckOut> checkOuts = new ArrayList<>();

}
