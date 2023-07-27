package com.ssafy.project.repository;

import com.ssafy.project.entity.user.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
