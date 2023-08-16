package com.ssafy.project.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Schema(description = "유저 방 Response DTO")
public class UserRoomDto {
    @Schema(description = "유저 아이디")
    private Long userId;
}
