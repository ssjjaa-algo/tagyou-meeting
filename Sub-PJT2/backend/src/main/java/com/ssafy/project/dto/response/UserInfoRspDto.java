package com.ssafy.project.dto.response;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserInfoRspDto {
    private String userEmail;
    private String userName;
    private String phoneNumber;
    private int userAge;
    private Gender userGender;
    private int userLike;

    public UserInfoRspDto(User user) {
        this.userEmail = user.getUserEmail();
        this.userName = user.getUserName();
        this.phoneNumber = user.getPhoneNumber();
        this.userAge = user.getUserAge();
        this.userGender = user.getUserGender();
        this.userLike = user.getUserLike();
    }
}
