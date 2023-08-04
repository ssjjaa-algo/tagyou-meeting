package com.ssafy.project.dto.request;

import com.ssafy.project.domain.user.Profile;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProfileReqDto {
    //// 이미지 필요

    private String userSido;
    private String userGugun;
    private String userJob;
    private String userHobby;
    private String userMbti;
    private String content;

}
