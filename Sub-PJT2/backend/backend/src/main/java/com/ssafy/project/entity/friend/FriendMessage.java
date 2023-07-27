package com.ssafy.project.entity.friend;

import com.ssafy.project.entity.BaseTimeEntity;
import com.ssafy.project.entity.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class FriendMessage extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "friend_ship_id")
    private FriendShip freindShip;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="message_from_user_id")
    private User messageFrom; // 전송자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="message_to_user_id")
    private User messageTo; // 수신자

    private String content;
 }
