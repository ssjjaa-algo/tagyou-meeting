package com.ssafy.project.entity.room;


import com.ssafy.project.entity.BaseTimeEntity;
import com.ssafy.project.entity.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class MeetingRoomMessage extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private MeetingRoom meetingRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="message_from_user_id")
    private User messageFrom; // 전송자

    private String content;

}
