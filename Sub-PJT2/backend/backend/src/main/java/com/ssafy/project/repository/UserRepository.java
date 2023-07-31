package com.ssafy.project.repository;

import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByUserName(String username);
    User findByUserEmail(String userEmail);

}
