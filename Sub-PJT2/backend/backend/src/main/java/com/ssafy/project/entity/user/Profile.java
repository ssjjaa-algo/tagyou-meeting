package com.ssafy.project.entity.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.project.entity.BaseTimeEntity;
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
public class Profile extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_profile_id")
    private Long profileId;

    @JsonBackReference
    @OneToOne(fetch = LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", updatable = false)
    private User user;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL)
    private List<ProfileImage> profileImages = new ArrayList<>();

    @Column(nullable = false)
    private String userRegion;

    @Column(nullable = false)
    private String userJob;

    @Column(nullable = false)
    private String userHobby;

    @Column(nullable = false)
    private String userMbti;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Builder
    public Profile(User user, String userRegion, String userJob, String userHobby, String userMbti, String content) {
        this.user = user;
        this.userRegion = userRegion;
        this.userJob = userJob;
        this.userHobby = userHobby;
        this.userMbti = userMbti;
        this.content = content;
    }

    public void updateProfile(String userRegion, String userJob, String userHobby, String userMbti, String content) {
        this.userRegion = userRegion;
        this.userJob = userJob;
        this.userHobby = userHobby;
        this.userMbti = userMbti;
        this.content = content;
        this.profileImages = new ArrayList<>();
        profileImages.forEach(this::addImage);
    }

    // 연관관계 편의 메서드
    public void addImage(ProfileImage profileImage) {
        profileImages.add(profileImage);
        profileImage.setProfile(this);
    }

}
