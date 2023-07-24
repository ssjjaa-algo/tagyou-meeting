package com.ssafy.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Profile extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_profile_id")
    private Long profileId;

    @JsonIgnore
    @OneToOne(fetch = LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL)
    private List<ProfileImage> profileImages = new ArrayList<>();

    @Column(name = "user_region", updatable = false)
    private String region;

    @Column(name = "user_job", updatable = false)
    private String job;

    @Column(name = "user_hobby", updatable = false)
    private String hobby;

    @Column(name = "user_mbti", updatable = false)
    private String mbti;

    @Column(nullable = false, columnDefinition = "int default 0")
    private int userLike;

    private String content;

    @Builder
    public Profile(User user, String region, String job, String hobby, String mbti, String content) {
        this.user = user;
        this.region = region;
        this.job = job;
        this.hobby = hobby;
        this.mbti = mbti;
        this.content = content;
    }
    public void updateProfile(String title, String content, List<ProfileImage> profileImages) {
        this.region = region;
        this.job = job;
        this.hobby = hobby;
        this.mbti = mbti;
        this.content = content;
        this.profileImages = new ArrayList<>();
        profileImages.forEach(this::addImage);
    }

    // 연관관계 편의 메서드
    public void addImage(ProfileImage profileImage) {
        profileImages.add(profileImage);
        profileImage.addProfile(this);
    }

}
