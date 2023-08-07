package com.study.SpringBootWebSocketChatServer.domain.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.study.SpringBootWebSocketChatServer.domain.status.MessageType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
@Getter
@Setter
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
    @JsonProperty(value = "chat_room_id")
    private Long chatRoomId;
}
