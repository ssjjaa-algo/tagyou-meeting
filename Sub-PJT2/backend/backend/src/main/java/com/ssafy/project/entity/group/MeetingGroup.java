package com.ssafy.project.entity.group;

import com.ssafy.project.entity.BaseTimeEntity;
import com.ssafy.project.entity.Gender;
import com.ssafy.project.entity.room.GroupMeetingRoom;
import com.ssafy.project.exception.OverLimitGroupCountException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class MeetingGroup extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private GroupMeetingRoom groupMeetingRoom;

    @Enumerated(EnumType.STRING)
    private MeetingGroupRole groupRole; // LEADER, MEMBER

    private int groupCount;

    @Enumerated(EnumType.STRING)
    private Gender groupGender;

    private boolean accepted;

    public void acceptGroup() {
        if (this.groupCount >= 3) {
            throw new OverLimitGroupCountException("그룹 인원 초과입니다.");
        }
        this.accepted = true;
        this.groupCount += 1;
    }

}
