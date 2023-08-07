package com.ssafy.project.dto.response;

import com.ssafy.project.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserRspDto {
    private String name;
//    private String picture;

    public UserRspDto(User user) {
        this.name = user.getUserName();
    }
}
