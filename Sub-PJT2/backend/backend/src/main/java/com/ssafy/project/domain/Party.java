package com.ssafy.project.domain;

import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.exception.OverLimitPartyCountException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Party extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long partyId;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "room_id")
//    private MeetingRoom meetingRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private PartyRole partyRole; // LEADER, MEMBER

    private int partyCount;

    private boolean accepted;

    public void acceptParty() {
        if(this.partyCount >= 3){
            throw new OverLimitPartyCountException("그룹 인원 초과입니다.");
        }
        this.accepted = true;
        this.partyCount += 1;
    }

    public void quitParty(){

    }
}
