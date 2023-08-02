package com.ssafy.project.dto.request;

import com.ssafy.project.domain.friend.FriendShipStatus;
import lombok.*;
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FriendReqDto {
    private Long userId;
    private Long targetUserId;
    private FriendShipStatus friendShipStatus;

    public FriendReqDto(Long userId, Long targetUserId) {
        this.userId = userId;
        this.targetUserId = targetUserId;
    }
}