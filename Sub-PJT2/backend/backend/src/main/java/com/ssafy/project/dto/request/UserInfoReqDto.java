package com.ssafy.project.dto.request;

import com.ssafy.project.domain.Gender;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserInfoReqDto {
    private String phoneNumber;
    private int userAge;
    private Gender userGender;
}
