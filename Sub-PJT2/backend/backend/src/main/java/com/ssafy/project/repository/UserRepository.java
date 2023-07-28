package com.ssafy.project.repository;

import com.ssafy.project.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
//    Optional<User> findUserByEmailAndProvider(String email, String provider);
    Optional<User> findUserByUserEmail(String email);
}




//import com.ssafy.project.domain.user.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface UserRepository extends JpaRepository<User, Long> {
//    List<User> findByUserName(String username);
//}
