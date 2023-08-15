package com.ssafy.project.dto.response;

import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.room.OneMeetingRoom;
import lombok.Getter;

@Getter
public class GroupRoomRspDto {
    private Long roomId;
    private String maleUserNickname;
    private String femaleUserNickname;

    public GroupRoomRspDto(GroupMeetingRoom meetingRoom) {
        this.roomId = meetingRoom.getId();

    }
}
