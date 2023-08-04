package com.ssafy.project.dto.request;

import com.ssafy.project.domain.notice.Notice;
import com.ssafy.project.domain.notice.NoticeType;
import com.ssafy.project.domain.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeReqDto {
    private Long userId;
    private NoticeType noticeType;
    private String noticeContent;

    public Notice toEntity(User user){
        return Notice.builder()
                .user(user)
                .type(noticeType)
                .content(noticeContent)
                .build();
    }
}
