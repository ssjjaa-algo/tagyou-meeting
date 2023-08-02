package com.ssafy.project.domain.user;

import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.dto.request.UserInfoReqDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CollectionId;

import static jakarta.persistence.FetchType.LAZY;

@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String userEmail;

//    @Column//(nullable = false)
//    private String userPassword;

    @Column(nullable = false, unique = true)
    private String userName;

    @Column//(nullable = false)
    private String phoneNumber;

    @Column//(nullable = false)
    private int userAge;

    @OneToOne(fetch = LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "main_image_id")
    private Image mainImage;

    @Enumerated(EnumType.STRING)
    private Gender userGender;

    @Column//(nullable = false)
    private int userLike;

    @Enumerated(EnumType.STRING)
    private RoleType roleType = RoleType.USER;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private MeetingGroup meetingGroup;

    @Builder //// 여기 나중에 조건에 맞게 수정해야댐
    public User(String userEmail, String userName) {
        this.userEmail = userEmail;
        this.userName = userName;
    }
    public void changeUser(UserInfoReqDto userInfoReqDto){
        this.phoneNumber = userInfoReqDto.getPhoneNumber();
        this.userAge = userInfoReqDto.getUserAge();
        this.userLike = 0;
    }
}