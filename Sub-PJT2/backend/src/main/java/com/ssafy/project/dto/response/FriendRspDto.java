package com.ssafy.project.dto.response;

import com.ssafy.project.domain.friend.FriendShip;
import com.ssafy.project.domain.friend.FriendShipStatus;
import com.ssafy.project.domain.user.User;
import lombok.Getter;

@Getter
public class FriendRspDto {
    private Long targetId;
    private String targetName;
    private String targetImageUrl;
    private FriendShipStatus friendShipStatus;

    public FriendRspDto(FriendShip friendShip) {
        // 타겟 유저
        User friendUser = friendShip.getTargetUser();

        this.targetId = friendUser.getId();
        this.targetName = friendUser.getUserName();
        this.targetImageUrl = friendUser.getMainImage().getFilePath();
        this.friendShipStatus = friendShip.getFriendShipStatus();
    }
}
