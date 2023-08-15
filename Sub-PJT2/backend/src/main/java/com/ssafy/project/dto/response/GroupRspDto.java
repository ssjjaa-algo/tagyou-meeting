package com.ssafy.project.dto.response;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import lombok.Getter;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.stream.Collectors;


@Getter
public class GroupRspDto {

    private Long groupId;
    private Gender groupGender;
    private List<UserRspDto> groupUser;

    public GroupRspDto(MeetingGroup group) {
        this.groupId = group.getId();
        this.groupGender = group.getGroupGender();
        this.groupUser = group.getGroupUser().stream().map(UserRspDto::new).collect(Collectors.toCollection(LinkedList::new));
    }

}
