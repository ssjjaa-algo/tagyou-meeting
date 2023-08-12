package com.ssafy.project.domain.room;


import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.message.ChatMessage;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "room_type")
@Getter
@Entity
public abstract class MeetingRoom extends BaseTimeEntity implements Serializable {

    private static final long serialVersionUID = 34789214329287934L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @Enumerated(value = EnumType.STRING)
    private MeetingRoomStatus status = MeetingRoomStatus.ACTIVE;

    private String sessionId;
}

