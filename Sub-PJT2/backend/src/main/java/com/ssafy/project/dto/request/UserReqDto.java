package com.ssafy.project.dto.request;

import com.ssafy.project.domain.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserReqDto {
    private Long uId;
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
