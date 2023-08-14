package com.ssafy.project.repository;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.room.OneMeetingRoom;

import java.util.Optional;

public interface OneRoomRepositoryCustom {
    Optional<OneMeetingRoom> findRamdomRoom(Gender gender);
}
