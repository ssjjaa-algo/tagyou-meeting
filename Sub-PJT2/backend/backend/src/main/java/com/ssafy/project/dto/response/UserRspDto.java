package com.ssafy.project.dto.response;

import com.ssafy.project.domain.Gender;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserRspDto {
    private String userEmail;
    private String userPassword;
    private String userName;
    private String phoneNumber;
    private int userAge;
    private Gender userGender;
    private int userLike;

    ///// 여기 해야됨

}
