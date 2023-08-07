package com.ssafy.project.domain.message;

import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

public enum MessageType {
    ENTER(0, "게임방 입장"),
    EXIT(1, "게임방 퇴장"),
    TALK(2, "메시지 전송"),
    PROFILE_REQUEST(3, "상대방 프로필 요청");

    private final int code;
    private final String name;

    MessageType(int code, String name) {
        this.code = code;
        this.name = name;
    }

    public int getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @Getter
    @Entity
    public static class MeetingRoomMessage extends BaseTimeEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "message_id")
        private Long id;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "room_id")
        private MeetingRoom meetingRoom;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name="sender_id")
        private User messageFrom; // 전송자

        private String content;

    }
}
