package com.ssafy.project.domain.group;

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
