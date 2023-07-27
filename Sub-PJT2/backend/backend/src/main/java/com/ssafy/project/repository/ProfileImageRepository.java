package com.ssafy.project.repository;

import com.ssafy.project.entity.user.ProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileImageRepository extends JpaRepository<ProfileImage, Long> {

}
