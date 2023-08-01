package com.ssafy.project.dto.request;

import com.ssafy.project.domain.Gender;
import lombok.Getter;
import lombok.Value;

@Getter
@Value
public class UserInfoReqDto {
    private String phoneNumber;
    private int userAge;
    private Gender userGender;

    public UserInfoReqDto(String phoneNumber, int age, Gender gender) {
        this.phoneNumber = phoneNumber;
        this.userAge = age;
        this.userGender = gender;
    }
}
