package com.cgi.library.repository;

import com.cgi.library.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID>, JpaSpecificationExecutor<Book> {
//    Page<Book> findByTitleContainingSearchQueryIgnoreCase(@Nullable Specification<Book> spec, @Param("searchQuery") String searchQuery, Pageable pageable);
}
