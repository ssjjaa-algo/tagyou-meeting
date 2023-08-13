package com.ssafy.project.dto.response;

import com.ssafy.project.domain.room.OneMeetingRoom;
import lombok.Getter;

@Getter
public class OneRoomRspDto {
    private Long roomId;
    private String maleUserNickname;
    private String femaleUserNickname;

    public OneRoomRspDto(OneMeetingRoom meetingRoom) {
        this.roomId = meetingRoom.getId();
        if(meetingRoom.getMaleUser() != null)
            this.maleUserNickname = meetingRoom.getMaleUser().getUserName();
        if(meetingRoom.getFemaleUser() != null)
            this.femaleUserNickname = meetingRoom.getFemaleUser().getUserName();
    }
}
