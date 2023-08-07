package com.ssafy.project.dto.request;

import lombok.*;
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FriendReqDto {
    private Long userId;
    private Long targetUserId;
}