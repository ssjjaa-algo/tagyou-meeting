package com.ssafy.project.domain.room;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@DiscriminatorValue("O")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class OneMeetingRoom extends MeetingRoom{

    @OneToMany(mappedBy = "meetingRoom", cascade = CascadeType.ALL)
    private List<User> userList = new ArrayList<>(); // 남자, 여자

    @Builder
    public OneMeetingRoom(User user) {
        addUser(user);
    }

    public void addUser(User user){
        this.userList.add(user);
        user.setMeetingRoom(this);
    }

    // 연관관계 편의 메소드
    public void removeUser(User user){
        user.quitRoom();
        this.userList.remove(user);
    }

    public void clearUser(){
        for (User user : this.userList) {
            user.quitRoom();
        }
        this.userList.clear();
    }

}
