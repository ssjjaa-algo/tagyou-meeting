package com.ssafy.project.repository;

import com.ssafy.project.domain.message.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findAllByMeetingRoomId(Long id);
}
