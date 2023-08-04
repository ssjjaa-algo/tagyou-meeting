package com.ssafy.project.domain.room;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="male_user_id")
    private User maleUser; // 남자

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="female_user_id")
    private User femaleUser; // 여자

    public void setMaleUser(User maleUser) {
        this.maleUser = maleUser;
    }

    public void setFemaleUser(User femaleUser) {
        this.femaleUser = femaleUser;
    }

    @Builder
    public OneMeetingRoom(User maleUser, User femaleUser) {
        this.maleUser = maleUser;
        this.femaleUser = femaleUser;
    }
}
