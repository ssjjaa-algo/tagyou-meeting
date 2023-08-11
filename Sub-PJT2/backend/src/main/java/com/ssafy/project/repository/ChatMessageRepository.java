package com.ssafy.project.repository;

import com.ssafy.project.domain.message.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    Optional<List<ChatMessage>> findAllByMeetingRoomId(Long id);
}
