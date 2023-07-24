package com.ssafy.project.domain;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId", updatable = false)
    private Long userId;

    @Column(name = "loginId", nullable = false, unique = true)
    private String loginId;

    @Column(name = "userPassword", nullable = false)
    private String userPassword;

    @Column(name = "userName", nullable = false)
    private String userName;

    @Column(name = "phoneNumber", nullable = false, unique = true)
    private String phoneNumber;

    @Column(name = "userEmail", nullable = false, unique = true)
    private String userEmail;

    @Column(name = "userAge", nullable = false)
    private int userAge;

    @Column(name = "userGender", nullable = false)
    private int userGender;

    @Column(name = "userMode", nullable = false)
    private int userMode;

    @Column(name = "createDate", nullable = true)
    private LocalDateTime createDate;

    @Builder //// 여기 나중에 조건에 맞게 수정해야댐
    public User(String loginId, String userPassword, String userName,
            String phoneNumber, String userEmail, int userAge,
            int userGender, int userMode, LocalDateTime createDate) {
        this.loginId = loginId;
        this.userPassword = userPassword;
        this.userName = userName;
        this.phoneNumber = phoneNumber;
        this.userEmail = userEmail;
        this.userAge = userAge;
        this.userGender = userGender;
        this.userMode = userMode;
        this.createDate = createDate;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("user"));
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return Long.toString(userId); //// ???
    }

    @Override
    public boolean isAccountNonExpired() {
        // 만료여부 확인
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // 계정 잠금 여부 확인
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // 패스워드 만료 확인
        return true;
    }

    @Override
    public boolean isEnabled() {
        // 계정 사용 가능 여부 확인
        return true;
    }
}