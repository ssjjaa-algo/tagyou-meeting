package com.ssafy.project.domain.message;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatMessagePayload {

    @NotBlank
    private String content;

    @NotBlank
    private String sender;

    @NotBlank
    @JsonProperty(value = "message_type")
    private MessageType messageType;

    @NotNull
    @JsonProperty(value = "meeting_room_id")
    private Long meetingRoomId;

    public ChatMessagePayload(ChatMessage message){
        this.content = message.getContent();
        this.sender = message.getSender();
        this.messageType = message.getType();
        this.meetingRoomId = message.getMeetingRoom().getId();
    }
}
