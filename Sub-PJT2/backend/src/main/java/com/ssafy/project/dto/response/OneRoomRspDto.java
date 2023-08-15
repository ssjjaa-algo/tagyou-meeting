package com.ssafy.project.dto.response;

import com.ssafy.project.domain.room.OneMeetingRoom;
import lombok.Getter;

@Getter
public class OneRoomRspDto {
    private Long roomId;
    private String roomType;
    private String sessionId;
    private String maleUserName;
    private String femaleUserName;

    public OneRoomRspDto(OneMeetingRoom meetingRoom) {
        this.roomId = meetingRoom.getId();
        this.roomType = "One";
        this.sessionId = meetingRoom.getSessionId();
        if(meetingRoom.getMaleUser() != null)
            this.maleUserName = meetingRoom.getMaleUser().getUserName();
        if(meetingRoom.getFemaleUser() != null)
            this.femaleUserName = meetingRoom.getFemaleUser().getUserName();
    }
}
