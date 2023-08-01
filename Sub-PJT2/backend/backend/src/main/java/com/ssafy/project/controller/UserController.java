package com.ssafy.project.controller;

import com.ssafy.project.domain.user.User;
import com.ssafy.project.service.TokenService;
import com.ssafy.project.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    static HttpHeaders headers = new HttpHeaders();
    static {
        headers.add("Content-Type", "text/plain;charset=UTF-8");
    }

    private final UserService userService;
    private final TokenService tokenService;

    @GetMapping("/mypage")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        System.out.println(">>> userEmail: "+tokenService.getUid(request.getHeader("Auth")));

        return null;
    }

//    @GetMapping("/first")
//    public ResponseEntity<?> firstLogin(HttpServletRequest request) {
//        // response 형식 바꾸기
//        if(userService.hasDetailInfo(tokenService.getUid(request.getHeader("Auth"))))
//            return new ResponseEntity<String>("첫 로그인 아님", headers, HttpStatus.OK);
//        else
//            return new ResponseEntity<String>("첫 로그인. 유저 추가정보 입력 필요", headers, HttpStatus.OK);
//    }
//
//    @GetMapping("/mypage")
//    public ResponseEntity<?> getMypage(HttpServletRequest request) {
//        String email = tokenService.getUid(request.getHeader("Auth"));
//        return null;
//    }



}
