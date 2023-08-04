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

import java.util.LinkedList;
import java.util.Queue;

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
    private MeetingRoom meetingRoom;

    @OneToMany(mappedBy = "meetingGroup", cascade = CascadeType.ALL)
    private Queue<User> groupUser = new LinkedList<>();

    @Enumerated(EnumType.STRING)
    private Gender groupGender;

    @Builder
    public MeetingGroup(User user) {
        this.groupUser.add(user);
        this.groupGender = user.getUserGender();
    }

    public void acceptGroup(User user) {
        if(this.groupUser.size() > 3)
            throw new OverLimitGroupCountException("그룹 인원이 초과되었습니다.");
        if(this.groupGender != user.getUserGender())
            throw new IllegalArgumentException("해당하는 그룹 성별이 다릅니다.");
        this.groupUser.add(user);
    }

    public void quitGroup(User user){
        this.groupUser.remove(user);
    }

    public void deleteGroup() {
        this.groupUser.clear();
    }

}
