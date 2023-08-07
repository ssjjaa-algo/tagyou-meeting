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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/profile", produces = "application/json; charset=utf8")
public class ProfileController {

    private final TokenService tokenService;
    private final ProfileService profileService;

    @GetMapping("")
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        Profile profile = profileService.getProfile(userId);
        if(profile == null)
            return ResponseEntity.ok().body("does not exist");
        else return ResponseEntity.ok().body(new ProfileRspDto(profile));
    }

    @GetMapping("/{uId}")
    public ResponseEntity<?> getFriendProfile(HttpServletRequest request, @PathVariable String uId) {
        Long userId = Long.parseLong(uId);
        Profile profile = profileService.getProfile(userId);
        if(profile == null)
            return ResponseEntity.ok().body("does not exist");
        else return ResponseEntity.ok().body(new ProfileRspDto(profile));
    }

    @PostMapping("")
    public ResponseEntity<?> makeProfile(HttpServletRequest request, @RequestBody ProfileReqDto profileReqDto) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        Profile profile = profileService.makeProfile(userId, profileReqDto);
            return new ResponseEntity<>(new ProfileRspDto(profile), HttpStatus.CREATED);
    }

    @PutMapping("")
    public ResponseEntity<?> editProfile(HttpServletRequest request, @RequestBody ProfileReqDto profileReqDto) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        Profile profile = profileService.editProfile(userId, profileReqDto);
        if(profile == null)
            return ResponseEntity.ok().body("not found");
        return ResponseEntity.ok().body(new ProfileRspDto(profile));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/image")
    public List<String> getProfileImages(HttpServletRequest request) {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return profileService.getProfileImages(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/image")
    public String uploadProfileImage(HttpServletRequest request, @RequestParam("file") MultipartFile file) throws IOException {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        String url = profileService.saveProfileImage(id, file);
        return url;
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/image")
    public String deleteProfileImage(HttpServletRequest request) {

        return "deleteProfileImage";
    }

}
