package com.ssafy.project.domain.friend;


import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class FriendShip extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long friendShipId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_id")
    private User targetUser;

    @Enumerated(EnumType.STRING)
    private FreindShipStatus freindShipStatus; // FOLLOW, UNFOLLOW

    @Builder
    public FriendShip(User user, User targetUser) {
        this.user = user;
        this.targetUser = targetUser;
        this.freindShipStatus = FreindShipStatus.NONE;
    }

    public void applyFriendShip(){
        this.freindShipStatus = FreindShipStatus.READY;
    }

    public void acceptFriendShip(){
        this.freindShipStatus = FreindShipStatus.FOLLOW;
    }

    public void blockFriendShip(){

        this.freindShipStatus = FreindShipStatus.BLOCK;
    }
}
