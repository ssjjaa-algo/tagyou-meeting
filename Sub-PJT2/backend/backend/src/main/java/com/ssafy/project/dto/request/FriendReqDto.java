package com.ssafy.project.dto.request;

import lombok.Getter;
import lombok.Value;

@Getter
@Value
public class FriendReqDto {
    Long friendId;
    String friendName;

    public FriendReqDto(Long friendId, String friendName) {
        this.friendId = friendId;
        this.friendName = friendName;
    }
}
