package com.ssafy.project.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.project.domain.message.ChatMessage;
import com.ssafy.project.domain.message.MessageType;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomMessageReqDto {

    private String content;

    @JsonProperty(value = "message_type")
    private MessageType messageType;

    @JsonProperty(value = "meeting_room_id")
    private Long meetingRoomId;

    public RoomMessageReqDto(ChatMessage message){
        this.content = message.getContent();
        this.messageType = message.getMessageType();
        this.meetingRoomId = message.getMeetingRoom().getId();
    }
}
