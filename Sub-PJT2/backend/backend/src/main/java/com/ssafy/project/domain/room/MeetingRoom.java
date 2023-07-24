package com.ssafy.project.domain.room;

import com.ssafy.project.domain.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "rtype")
@Getter
@Entity
public abstract class MeetingRoom extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    private boolean isReady;

    private int maleCount;
    private int femaleCount;


}
