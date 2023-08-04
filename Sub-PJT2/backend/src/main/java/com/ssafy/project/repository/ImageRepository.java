package com.ssafy.project.repository;

import com.ssafy.project.domain.user.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {

    Optional<Image> findByOrigFileName(String orgFileName);

}
