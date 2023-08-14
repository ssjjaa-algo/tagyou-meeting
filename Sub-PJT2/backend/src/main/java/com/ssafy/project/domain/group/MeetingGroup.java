package com.ssafy.project.domain.group;

import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.LinkedList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class MeetingGroup extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="group_id")
    private Long id;

    @OneToMany(mappedBy = "meetingGroup", cascade = CascadeType.ALL)
    private List<User> groupUser = new LinkedList<>();

    @Enumerated(EnumType.STRING)
    private Gender groupGender;

    @Builder
    public MeetingGroup(Gender groupGender) {
        this.groupGender = groupGender;
    }

    public void quitGroup(User user){
        this.groupUser.remove(user);
        user.quitMeetingGroup();
    }

    public void deleteGroup() {
        for (User user : groupUser) {
            user.quitMeetingGroup();
        }
        this.groupUser.clear();
    }

}
