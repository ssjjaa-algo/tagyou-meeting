package com.ssafy.project.domain.group;

import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.exception.OverLimitGroupCountException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
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
    @Column(name="group_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private GroupMeetingRoom groupMeetingRoom;

    @OneToMany(mappedBy = "meetingGroup", cascade = CascadeType.ALL)
    private List<UserMeetingGroup> groupUser = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Gender groupGender;

    @Builder
    public MeetingGroup(User user) {
        this.groupUser.add(new UserMeetingGroup(user, GroupRole.HOST));
        this.groupGender = user.getUserGender();
    }

    public void InviteGroup(User user) {
        if(this.groupUser.size() >= 3)
            throw new OverLimitGroupCountException("그룹 인원이 초과되었습니다.");
        if(this.groupGender != user.getUserGender())
            throw new IllegalArgumentException("해당하는 그룹 성별이 다릅니다.");
        this.groupUser.add(new UserMeetingGroup(user, GroupRole.MEMBER));
    }

    public void quitGroup(User user){
        this.groupUser.removeIf(groupUser -> groupUser.getUser().getId().equals(user.getId()));
    }

    public void deleteGroup(UserMeetingGroup user) {

        this.groupUser.clear();
    }

    public void attendMeetingRoom(GroupMeetingRoom meetingRoom){
        this.groupMeetingRoom = meetingRoom;
    }

    public void quitMeetingRoom(){
        this.groupMeetingRoom = null;
    }

}
