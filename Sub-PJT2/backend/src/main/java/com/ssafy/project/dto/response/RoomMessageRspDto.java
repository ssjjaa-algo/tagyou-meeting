package com.ssafy.project.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.project.domain.message.ChatMessage;
import com.ssafy.project.domain.message.MessageType;
import com.ssafy.project.domain.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomMessageRspDto {

    private String senderName;

    private String content;

    @JsonProperty(value = "message_type")
    private MessageType messageType;

    @JsonProperty(value = "meeting_room_id")
    private Long meetingRoomId;

    public RoomMessageRspDto(ChatMessage message){
        this.senderName = message.getSender().getUserName();
        this.content = message.getContent();
        this.messageType = message.getMessageType();
        this.meetingRoomId = message.getMeetingRoom().getId();
    }
}
