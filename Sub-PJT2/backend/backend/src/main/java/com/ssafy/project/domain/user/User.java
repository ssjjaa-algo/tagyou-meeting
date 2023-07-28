package com.ssafy.project.domain.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import static jakarta.persistence.FetchType.LAZY;

@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Builder
@DynamicUpdate
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String userEmail;

    @Column//(nullable = false)
    private String userPassword;

    @Column(nullable = false, unique = true)
    private String userName;

    @JsonBackReference
    @OneToOne(fetch = LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "main_image_id")
    private Image mainImage;

    @Column//(nullable = false)
    private int userAge;

    @Enumerated(EnumType.STRING)
    private Gender userGender;

    @Column//(nullable = false)
    private int userLike;

    @Enumerated(EnumType.STRING)
    private RoleType roleType = RoleType.USER;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "group_id")
    private MeetingGroup meetingGroup;

    public User updateUser(String userName, String userEmail) {
        this.userName = userName;
        this.userEmail = userEmail;
        return this;
    }
}
