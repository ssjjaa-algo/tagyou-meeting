package com.ssafy.project.domain.room;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
@Entity
@DiscriminatorValue("G")
@Getter
public class GroupMeetingRoom extends MeetingRoom{


}