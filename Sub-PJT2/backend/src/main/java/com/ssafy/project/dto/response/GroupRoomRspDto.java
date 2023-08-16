package com.ssafy.project.dto.response;

import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.user.User;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class GroupRoomRspDto {
    private Long roomId;
    private String roomType;
    private String sessionId;
    private List<String> maleUserNameList;
    private List<String> femaleUserNameList;

    public GroupRoomRspDto(GroupMeetingRoom meetingRoom) {
        this.roomId = meetingRoom.getId();
        this.roomType = "Group";
        this.sessionId = meetingRoom.getSessionId();

        this.maleUserNameList = meetingRoom.getMaleList().stream()
                .filter(user -> user != null)
                .map(user -> user.getUserName()).collect(Collectors.toList());

        this.femaleUserNameList = meetingRoom.getMaleList().stream()
                .filter(user -> user != null)
                .map(user -> user.getUserName()).collect(Collectors.toList());
    }
}
