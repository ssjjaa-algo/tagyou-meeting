package com.ssafy.project.domain.room;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@DiscriminatorValue("O")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class OneMeetingRoom extends MeetingRoom{

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="male_user_id")
    @OneToOne(mappedBy = "meetingRoom", cascade = CascadeType.ALL)
    private User maleUser; // 남자

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="female_user_id")
    @OneToOne(mappedBy = "meetingRoom", cascade = CascadeType.ALL)
    private User femaleUser; // 여자

    @Builder
    public OneMeetingRoom(User newUser) {
        if(newUser.getUserGender() == Gender.MALE)
            setMaleUser(newUser);
        else
            setFemaleUser(newUser);
    }

    // 연관관계 편의 메소드
    public void setMaleUser(User user){
        this.maleUser = user;
        user.setMeetingRoom(this);
    }
    public void setFemaleUser(User user){
        this.femaleUser = user;
        user.setMeetingRoom(this);
    }

    public void removeMaleUser(){
        this.maleUser.quitRoom();
        this.maleUser = null;
    }
    public void removeFemaleUser(){
        this.femaleUser.quitRoom();
        this.femaleUser = null;
    }

}
