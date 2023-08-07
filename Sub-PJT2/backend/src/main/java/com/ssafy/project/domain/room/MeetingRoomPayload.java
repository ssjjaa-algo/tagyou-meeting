package com.study.SpringBootWebSocketChatServer.domain.model;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingRoomPayload {

    @NotBlank
    private String name;
}
