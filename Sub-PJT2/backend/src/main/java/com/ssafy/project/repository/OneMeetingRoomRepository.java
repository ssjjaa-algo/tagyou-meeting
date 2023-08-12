package com.ssafy.project.repository;

import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.domain.room.OneMeetingRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OneMeetingRoomRepository extends JpaRepository<OneMeetingRoom, Long> {

    Optional<OneMeetingRoom> findById(Long id);
    Optional<OneMeetingRoom> findByMaleUserId(Long userId);

    Optional<OneMeetingRoom> findByFemaleUserId(Long userId);
}
