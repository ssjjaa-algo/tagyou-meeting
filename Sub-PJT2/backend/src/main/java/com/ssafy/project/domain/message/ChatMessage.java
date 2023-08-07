package com.ssafy.project.domain.message;

import com.ssafy.project.domain.room.MeetingRoom;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    @Enumerated(value = EnumType.ORDINAL)
    private MessageType type;

    @Column(name = "is_read", nullable = false)
    private boolean isRead = false;

    @Column(nullable = false)
    private String sender;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private MeetingRoom meetingRoom;

    @Builder
    public ChatMessage(String content, MessageType type, String sender, MeetingRoom meetingRoom) {
        this.content = content;
        this.type = type;
        this.sender = sender;
        this.meetingRoom = meetingRoom;
    }
}
