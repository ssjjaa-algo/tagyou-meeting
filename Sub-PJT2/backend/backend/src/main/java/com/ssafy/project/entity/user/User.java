package com.ssafy.project.entity.user;

import com.ssafy.project.entity.BaseTimeEntity;
import com.ssafy.project.entity.Gender;
import com.ssafy.project.entity.group.MeetingGroup;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

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

    @Column//(nullable = false)
    private String phoneNumber;

    @Column//(nullable = false)
    private int userAge;

    @Enumerated(EnumType.STRING)
    private Gender userGender;

    @Column//(nullable = false)
    private int userLike;

    @Enumerated(EnumType.STRING)
    private RoleType roleType = RoleType.USER;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private MeetingGroup meetingGroup;

//    @Builder //// 여기 나중에 조건에 맞게 수정해야댐
//    public User(String userEmail, String userPassword, String userName, String phoneNumber, int userAge, Gender userGender) {
//        this.userEmail = userEmail;
//        this.userPassword = userPassword;
//        this.userName = userName;
//        this.phoneNumber = phoneNumber;
//        this.userAge = userAge;
//        this.userGender = userGender;
//        this.userLike = 0;
//    }

    public User updateUser(String userName, String userEmail) {
        this.userName = userName;
        this.userEmail = userEmail;
        return this;
    }
}
