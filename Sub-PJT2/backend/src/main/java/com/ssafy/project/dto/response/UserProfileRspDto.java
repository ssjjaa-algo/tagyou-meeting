package com.ssafy.project.dto.response;

import com.ssafy.project.dto.request.UserProfileReqDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserProfileRspDto {
    private String userName;
    private String userSido;
    private String userGugun;
    private String userJob;
    private String userMbti;

    public UserProfileRspDto(UserProfileReqDto userProfileReqDto){
        this.userName = userProfileReqDto.getUserName();
        this.userSido = userProfileReqDto.getUserSido();
        this.userGugun = userProfileReqDto.getUserGugun();
        this.userJob = userProfileReqDto.getUserJob();
        this.userMbti = userProfileReqDto.getUserMbti();
    }
}
