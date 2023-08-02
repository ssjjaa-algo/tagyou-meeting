package com.ssafy.project.domain.group;

import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Entity
public class UserMeetingGroup extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_group_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private MeetingGroup meetingGroup;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private GroupRole groupRole; // HOST, MEMBER

    private boolean accepted;

    public UserMeetingGroup(User user, GroupRole groupRole) {
        this.meetingGroup = meetingGroup;
        this.user = user;
        this.groupRole = groupRole;
    }

    public void addMeetingGroup(MeetingGroup meetingGroup) {
        this.meetingGroup = meetingGroup;
    }

    public void acceptInvite() {
        this.accepted = true;
    }

}
