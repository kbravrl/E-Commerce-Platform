package com.example.dreamshops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.dreamshops.model.Image;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findByProductId(Long id);
}
