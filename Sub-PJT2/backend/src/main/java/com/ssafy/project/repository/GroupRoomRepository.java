package com.ssafy.project.repository;

import com.ssafy.project.domain.room.GroupMeetingRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRoomRepository extends JpaRepository<GroupMeetingRoom, Long>, GroupRoomRepositoryCustom{
}
