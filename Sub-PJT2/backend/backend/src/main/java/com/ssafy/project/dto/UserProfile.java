package com.ssafy.project.dto;

import com.ssafy.project.entity.user.User;
import lombok.Getter;

@Getter
public class UserProfile {
    private String username; // 사용자 이름
    private String provider; // 로그인한 서비스
    private String email; // 사용자의 이메일

    public void setUserName(String userName) {
        this.username = userName;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // DTO 파일을 통하여 Entity를 생성하는 메소드
    public User toEntity() {
        return User.builder()
                .userName(this.username)
                .userEmail(this.email)
                .build();
    }
}