package com.cgi.library.repository;

import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.Arrays;

public class SpecificationBuilder<T> {
    private ArrayList<Specification<T>> specs;

    public SpecificationBuilder() {
        this.specs = new ArrayList<>();
    }

    SpecificationBuilder(Specification<T> spec) {
        this.specs = new ArrayList<>(Arrays.asList(spec));
    }

    public SpecificationBuilder<T> add(Specification<T> spec) {
        this.specs.add(spec);
        return this;
    }

    public Specification<T> build() {
        if (specs.size() == 0) {
            return null;
        }
        Specification<T> result = specs.get(0);
        for (int i = 1; i < specs.size(); i++) {
            result = result.and(specs.get(i));
        }
        return result;
    }
}
