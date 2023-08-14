package com.ssafy.project.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HobbyRspDto {
    private String hobby;

    public HobbyRspDto(String hobby) {
        this.hobby = hobby;
    }
}
