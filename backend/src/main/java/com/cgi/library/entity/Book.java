package com.cgi.library.entity;

import com.cgi.library.model.BookStatus;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Type;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
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
    @ToString.Exclude
    private List<CheckOut> checkOuts = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Book book = (Book) o;
        return getId() != null && Objects.equals(getId(), book.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
