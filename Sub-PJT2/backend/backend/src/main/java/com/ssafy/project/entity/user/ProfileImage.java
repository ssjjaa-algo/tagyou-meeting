package com.ssafy.project.entity.user;

import com.ssafy.project.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class ProfileImage extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileImgId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_profile_id")
    private Profile profile;

    @Column(nullable = false)
    private String origFileName;  // 파일 원본명

    @Column(nullable = false)
    private String filePath;  // 파일 저장 경로

    private Long fileSize;

    @Builder
    public ProfileImage(String origFileName, String filePath, Long fileSize) {
        this.origFileName = origFileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    // board 정보
    public void setProfile(Profile profile){
        this.profile = profile;

        // 이미지 목록에 없을 시 추가
        if(!profile.getProfileImages().contains(this))
            profile.getProfileImages().add(this);
    }
}


