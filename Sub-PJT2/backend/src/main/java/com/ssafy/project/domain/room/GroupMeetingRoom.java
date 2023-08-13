package com.ssafy.project.domain.room;

import com.ssafy.project.domain.group.MeetingGroup;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

@DiscriminatorValue("G")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class GroupMeetingRoom extends MeetingRoom {

    private int maleCount; // maxCnt = 3
    private int femaleCount; // maxCnt = 3

    @Builder
    public GroupMeetingRoom(int maleCount, int femaleCount) {
        this.maleCount = maleCount;
        this.femaleCount = femaleCount;
    }

}