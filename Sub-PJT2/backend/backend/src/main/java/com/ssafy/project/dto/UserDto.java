package com.ssafy.project.dto;

import com.ssafy.project.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserDto {
    private String email;
    private String name;
//    private String picture;

    public User toEntity() {
        return User.builder()
                .userEmail(email)
                .userName(name)
                .build();
    }

}
