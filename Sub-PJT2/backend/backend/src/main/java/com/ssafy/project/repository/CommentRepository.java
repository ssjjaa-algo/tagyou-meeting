package com.ssafy.project.repository;

import com.ssafy.project.entity.user.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
