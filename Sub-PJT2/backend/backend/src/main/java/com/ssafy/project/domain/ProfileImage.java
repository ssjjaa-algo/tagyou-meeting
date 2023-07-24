package com.ssafy.project.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class ProfileImage extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileImgId;

    // 사용자 지정 파일 이름
    private String uploadFileName;

    // 데이터베이스에 저장된 파일 이름
    private String storedFileName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_profile_id")
    private Profile profile;

    public void addProfile(Profile profile) {
        this.profile = profile;
    }

    @Builder
    public ProfileImage(Long profileImgId, String uploadFileName, String storedFileName, Profile profile) {
        this.profileImgId = profileImgId;
        this.uploadFileName = uploadFileName;
        this.storedFileName = storedFileName;
        this.profile = profile;
    }
}


