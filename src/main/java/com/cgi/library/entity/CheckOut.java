package com.cgi.library.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "checkout")
public class CheckOut {

    @Id
    @Column
    @Type(type="uuid-char")
    private UUID id;

    @Column(name = "borrower_first_name")
    private String borrowerFirstName;

    @Column(name = "borrower_last_name")
    private String borrowerLastName;

    @JoinColumn(name = "book_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Book borrowedBook;

    @Column(name = "checked_out_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkedOutDate;

    @Column(name = "due_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    @Column(name = "returned_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate returnedDate;

}
