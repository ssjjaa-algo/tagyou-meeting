package com.ssafy.project.dto.response;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import lombok.Getter;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;


@Getter
public class GroupRspDto {

    private Long groupId;
    private Long roomId;
    private Gender groupGender;
    private List<UserGroupDto> groupUser;

    public GroupRspDto(MeetingGroup group) {
        this.groupId = group.getId();
        if(group.getGroupUser().size() > 0)
            this.roomId = group.getGroupUser().get(0).getId();
        this.groupGender = group.getGroupGender();
        this.groupUser = group.getGroupUser().stream()
                .filter(user -> user != null)
                .map(user -> new UserGroupDto(user, group.getGroupUser().indexOf(user)))
                .collect(Collectors.toList());
    }

}
