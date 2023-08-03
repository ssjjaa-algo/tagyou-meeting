package com.ssafy.project.dto.response;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import lombok.Getter;

import java.util.List;


@Getter
public class GroupRspDto {

    private Long groupId;
    private Gender groupGender;
    private List<UserRspDto> groupMembers;

    public GroupRspDto(MeetingGroup group) {
        this.groupId = group.getId();
        this.groupGender = group.getGroupGender();
        this.groupMembers = group.getGroupUser().stream().map(UserRspDto::new).toList();
    }

}
