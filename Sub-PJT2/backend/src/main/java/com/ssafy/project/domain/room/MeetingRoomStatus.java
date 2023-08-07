package com.study.SpringBootWebSocketChatServer.domain.status;

public enum MeetingRoomStatus {
    ACTIVE(0),
    INACTIVE(1);

    private final int code;

    MeetingRoomStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
