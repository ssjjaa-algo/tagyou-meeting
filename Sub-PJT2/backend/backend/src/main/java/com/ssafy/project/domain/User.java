package com.ssafy.project.domain;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class User extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String loginId;

    @Column(nullable = false)
    private String userPassword;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false, unique = true)
    private String userEmail;

    @Column(nullable = false)
    private int userAge;

    @Column(nullable = false)
    private int userGender;

    @Column(nullable = false, columnDefinition = "int default 1")
    private int userMode;

    @Builder //// 여기 나중에 조건에 맞게 수정해야댐
    public User(String loginId, String userPassword, String userName,
            String phoneNumber, String userEmail, int userAge,
            int userGender, int userMode) {
        this.loginId = loginId;
        this.userPassword = userPassword;
        this.userName = userName;
        this.phoneNumber = phoneNumber;
        this.userEmail = userEmail;
        this.userAge = userAge;
        this.userGender = userGender;
        this.userMode = userMode;
    }

}