package com.ssafy.project.dto.response;

import com.ssafy.project.domain.group.GroupRole;
import com.ssafy.project.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserGroupDto {
    private String userName;
    private String ImageUrl;
    private int groupIdx;
//    private GroupRole groupRole;

    public UserGroupDto(User user, int idx) {
        this.userName = user.getUserName();
        this.ImageUrl = user.getMainImage().getFilePath();
        this.groupIdx = idx;
    }

//    public void setRole(GroupRole groupRole){
//        this.groupRole = groupRole;
//    }
}
