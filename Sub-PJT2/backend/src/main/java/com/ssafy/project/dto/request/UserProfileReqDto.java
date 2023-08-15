package com.ssafy.project.dto.request;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserProfileReqDto {
    private String userName;
    private String userSido;
    private String userGugun;
    private String userJob;
    private String userMbti;

}
