package com.ssafy.project.dto.response;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserRspDto {
    private String userEmail;
    private String userName;
    private String phoneNumber;
    private int userAge;
    private Gender userGender;
    private int userLike;

    public UserRspDto(User u) {
        this.userEmail = u.getUserEmail();
        this.userName = u.getUserName();
        this.phoneNumber = u.getPhoneNumber();
        this.userAge = u.getUserAge();
        this.userGender = u.getUserGender();
        this.userLike = u.getUserLike();
    }
}
