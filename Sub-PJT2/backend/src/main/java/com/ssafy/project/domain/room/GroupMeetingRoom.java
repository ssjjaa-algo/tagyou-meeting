package com.ssafy.project.domain.room;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@DiscriminatorValue("G")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class GroupMeetingRoom extends MeetingRoom {

    @OneToMany(mappedBy = "meetingRoom", cascade = CascadeType.ALL)
    private List<User> maleList = new ArrayList<>(); // 남자

    @OneToMany(mappedBy = "meetingRoom", cascade = CascadeType.ALL)
    private List<User> femaleList = new ArrayList<>(); // 여자

    @Builder
    public GroupMeetingRoom(MeetingGroup newGroup) {
        if(newGroup.getGroupGender().equals(Gender.MALE))
            addMaleUserList(newGroup);
        if(newGroup.getGroupGender().equals(Gender.FEMALE))
            addFemaleUserList(newGroup);
    }

    // 연관관계 편의 메소드
    public void addMaleUserList(MeetingGroup meetingGroup){
        for (User user : meetingGroup.getGroupUser()) {
            this.maleList.add(user);
            user.setMeetingRoom(this);
        }
    }

    public void addFemaleUserList(MeetingGroup meetingGroup){
        for (User user : meetingGroup.getGroupUser()) {
            this.femaleList.add(user);
            user.setMeetingRoom(this);
        }
    }

    public void removeMaleUserList(){
        for (User user : maleList) {
            user.quitRoom();
        }
        this.maleList.clear();
    }

    public void removeFemaleUserList(){
        for (User user : femaleList) {
            user.quitRoom();
        }
        this.femaleList.clear();
    }

}