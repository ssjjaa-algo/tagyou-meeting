package com.ssafy.project.domain.group;

import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.exception.OverLimitGroupCountException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "meetingGroup", cascade = CascadeType.ALL)
    private List<User> groupUser = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Gender groupGender;

    private boolean accepted;

    public MeetingGroup(MeetingGroupRole groupRole, int groupCount, Gender groupGender) {
        this.groupRole = groupRole;
        this.groupCount = groupCount;
        this.groupGender = groupGender;
    }

    public void acceptGroup() {
        if (this.groupCount >= 3) {
            throw new OverLimitGroupCountException("그룹 인원 초과입니다.");
        }
        this.accepted = true;
        this.groupCount += 1;
    }

}
