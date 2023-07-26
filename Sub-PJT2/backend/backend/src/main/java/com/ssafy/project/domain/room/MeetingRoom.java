package com.ssafy.project.domain.room;


import com.ssafy.project.domain.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "room_type")
@Getter
@Entity
public abstract class MeetingRoom extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    private boolean isStart; // 대기 : 0 시작 : 1

}
