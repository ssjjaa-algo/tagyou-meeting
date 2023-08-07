package com.study.SpringBootWebSocketChatServer.repository;

import com.study.SpringBootWebSocketChatServer.domain.model.MeetingRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingRoomRepository extends JpaRepository<MeetingRoom, Long> {

    Optional<MeetingRoom> findById(Long id);
}
