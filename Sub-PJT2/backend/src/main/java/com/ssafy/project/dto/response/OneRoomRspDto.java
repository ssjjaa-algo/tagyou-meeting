package com.ssafy.project.dto.response;

import com.ssafy.project.domain.room.OneMeetingRoom;
import lombok.Getter;

import java.util.List;

@Getter
public class OneRoomRspDto {
    private Long roomId;
    private String roomType;
    private String sessionId;
    private List<String> userList;

    public OneRoomRspDto(OneMeetingRoom meetingRoom) {
        this.roomId = meetingRoom.getId();
        this.roomType = "One";
        this.sessionId = meetingRoom.getSessionId();
        this.userList = meetingRoom.getUserList().stream().map(user -> user.getUserName()).toList();
    }

}
