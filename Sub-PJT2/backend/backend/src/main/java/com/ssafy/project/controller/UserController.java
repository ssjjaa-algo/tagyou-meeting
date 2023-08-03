package com.ssafy.project.controller;

import com.ssafy.project.dto.request.UserInfoReqDto;
import com.ssafy.project.dto.response.UserRspDto;
import com.ssafy.project.service.TokenService;
import com.ssafy.project.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/users", produces = "application/json; charset=utf8")
public class UserController {

    private final UserService userService;
    private final TokenService tokenService;

    @GetMapping("/tmp/token")
    public String tmpTokenGenerate(HttpServletRequest request) {
        String id = request.getHeader("userId");
        return tokenService.makeTmpToken(id);
//        return tokenService.generateToken(id, "USER").getToken();
    }

    // ====================== 회원 가입 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/first")
    public ResponseEntity<?> firstLogin(HttpServletRequest request) {
        if(userService.hasDetailInfo(tokenService.parseUId(request.getHeader("Auth"))))
            return ResponseEntity.ok().body("notFirst");
        else
            return ResponseEntity.ok().body("first");
    }

    // ====================== 마이페이지 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/mypage") // 마이페이지(users 테이블) 정보 받아오기
    public UserRspDto getMypage(HttpServletRequest request) {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return userService.getUserInfo(id);
    }

    // ==================== 회원 상세 정보 입력 ============================
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/mypage") // 첫 로그인 후 추가정보 넣기 or 마이페이지 정보 수정하기
    public UserRspDto editMypage(HttpServletRequest request, @RequestBody UserInfoReqDto userInfo) {
        String Token = request.getHeader("Auth");
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return userService.editUserInfo(id, userInfo);
    }

    // ---------------- 일반 회원 가입 (일단 보류) --------------------

}
