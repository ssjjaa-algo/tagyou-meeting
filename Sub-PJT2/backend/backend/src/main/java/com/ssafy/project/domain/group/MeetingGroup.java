package com.ssafy.project.domain.group;

import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.room.ThreeMeetingRoomGroup;
import com.ssafy.project.domain.user.UserGender;
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
    @JoinColumn(name = "three_room_group_id")
    private ThreeMeetingRoomGroup threeMeetingRoomGroup;

    @Enumerated(EnumType.STRING)
    private MeetingGroupRole groupRole; // LEADER, MEMBER

    private int groupCount;

    private UserGender userGender;

    private boolean accepted;

    public void acceptGroup() {
        if (this.groupCount >= 3) {
            throw new OverLimitGroupCountException("그룹 인원 초과입니다.");
        }
        this.accepted = true;
        this.groupCount += 1;
    }

}
