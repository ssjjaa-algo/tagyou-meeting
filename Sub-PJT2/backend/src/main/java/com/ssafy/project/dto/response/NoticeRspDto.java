package com.ssafy.project.dto.response;

import com.ssafy.project.domain.notice.Notice;
import com.ssafy.project.domain.notice.NoticeType;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class NoticeRspDto {

    private Long noticeId;
    private NoticeType noticeType;
    private String content;
    private LocalDateTime createDate;
    private boolean read;

    public NoticeRspDto(Notice notice) {
        this.noticeId = notice.getId();
        this.noticeType = notice.getType();
        this.content = notice.getContent();
        this.createDate = notice.getCreatedDate();
        this.read = notice.isRead();
    }

}







