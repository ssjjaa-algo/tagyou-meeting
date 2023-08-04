package com.ssafy.project.dto.response;

import com.ssafy.project.domain.user.Profile;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProfileRspDto {
    private String userName;
    private String userSido;
    private String userGugun;
    private String userJob;
    private String userHobby;
    private String userMbti;
    private String content;

    public ProfileRspDto(Profile profile) {
        this.userName = profile.getUser().getUserName();
        this.userSido = profile.getUserSido();
        this.userGugun = profile.getUserGugun();
        this.userJob = profile.getUserJob();
        this.userHobby = profile.getUserHobby();
        this.userMbti = profile.getUserMbti();
        this.content = profile.getContent();
    }
}
