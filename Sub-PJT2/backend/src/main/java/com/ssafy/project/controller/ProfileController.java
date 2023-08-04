package com.ssafy.project.controller;

import com.ssafy.project.domain.user.Profile;
import com.ssafy.project.dto.request.ProfileReqDto;
import com.ssafy.project.dto.response.ProfileRspDto;
import com.ssafy.project.service.ProfileService;
import com.ssafy.project.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/users", produces = "application/json; charset=utf8")
public class ProfileController {

    private final TokenService tokenService;
    private final ProfileService profileService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        Profile profile = profileService.getProfile(userId);
        if(profile == null)
            return ResponseEntity.ok().body("does not exist");
        else return ResponseEntity.ok().body(new ProfileRspDto(profile));
    }

    @PostMapping("/profile")
    public ResponseEntity<?> makeProfile(HttpServletRequest request, @RequestBody ProfileReqDto profileReqDto) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        Profile profile = profileService.makeProfile(userId, profileReqDto);
            return new ResponseEntity<>(new ProfileRspDto(profile), HttpStatus.CREATED);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> editProfile(HttpServletRequest request, @RequestBody ProfileReqDto profileReqDto) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        Profile profile = profileService.editProfile(userId, profileReqDto);
        if(profile == null)
            return ResponseEntity.ok().body("not found");
        return ResponseEntity.ok().body(new ProfileRspDto(profile));
    }
}
