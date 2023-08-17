package com.ssafy.project.dto.response;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Schema(description = "3:3 방 Response DTO")
public class GroupRoomRspDto {
    @Schema(description = "방 아이디")
    private Long roomId;
    @Schema(description = "방 타입")
    private String roomType;
    @Schema(description = "세션 아이디")
    private String sessionId;
    @Schema(description = "방 내의 남자 참가자 목록")
    private List<String> maleUserNameList;
    @Schema(description = "방 내의 여자 참가자 목록")
    private List<String> femaleUserNameList;

    public GroupRoomRspDto(GroupMeetingRoom meetingRoom) {
        this.roomId = meetingRoom.getId();
        this.roomType = "Group";
        this.sessionId = meetingRoom.getSessionId();

        this.maleUserNameList = meetingRoom.getUserList().stream()
                .filter(user -> user != null && user.getUserGender() == Gender.MALE)
                .map(user -> user.getUserName()).collect(Collectors.toList());

        this.femaleUserNameList = meetingRoom.getUserList().stream()
                .filter(user -> user != null && user.getUserGender() == Gender.FEMALE)
                .map(user -> user.getUserName()).collect(Collectors.toList());
    }
}
