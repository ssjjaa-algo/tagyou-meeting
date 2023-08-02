package com.ssafy.project.dto.response;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import lombok.Getter;


@Getter
public class GroupRspDto {

    private Long groupId;
    private Gender groupGender;

    public GroupRspDto(MeetingGroup group) {
        this.groupId = group.getId();
        this.groupGender = group.getGroupGender();
    }
}
