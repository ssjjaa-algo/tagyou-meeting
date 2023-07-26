package com.ssafy.project.domain.room;

import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.user.UserGender;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class ThreeMeetingRoomGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int groupMeetingRoomUserId;

    private UserGender userGender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "three_meeting_room_id")
    private ThreeMeetingRoom threeMeetingRoom;

    @OneToMany(mappedBy = "threeMeetingRoomGroup", cascade = CascadeType.ALL)
    private List<MeetingGroup> groups = new ArrayList<>();

}
