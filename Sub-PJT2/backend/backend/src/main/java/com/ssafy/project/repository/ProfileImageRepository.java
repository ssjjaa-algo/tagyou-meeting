package com.ssafy.project.repository;

import com.ssafy.project.domain.user.ProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileImageRepository extends JpaRepository<ProfileImage, Long> {

}
