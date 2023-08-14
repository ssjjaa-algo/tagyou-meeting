package com.ssafy.project.controller;

import com.ssafy.project.domain.user.Profile;
import com.ssafy.project.dto.request.HobbyReqDto;
import com.ssafy.project.dto.request.ProfileReqDto;
import com.ssafy.project.dto.response.HobbyRspDto;
import com.ssafy.project.dto.response.ImageRspDto;
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
        Profile profile = profileService.getProfileByUId(userId);
        if(profile == null)
            return ResponseEntity.ok().body("does not exist");
        else return ResponseEntity.ok().body(new ProfileRspDto(profile));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getFriendProfile(HttpServletRequest request, @PathVariable Long userId) {
        Profile profile = profileService.getProfileByUId(userId);
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
    public List<ImageRspDto> getProfileImages(HttpServletRequest request) {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return profileService.getProfileImages(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/image/{uId}")
    public List<ImageRspDto> getFriendsProfileImages(@PathVariable Long uId) {
        return profileService.getProfileImages(uId);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/image")
    public ImageRspDto uploadProfileImage(HttpServletRequest request, @RequestParam("file") MultipartFile file) throws IOException {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return profileService.saveProfileImage(id, file);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/image/{imgId}")
    public String deleteProfileImage(HttpServletRequest request, @PathVariable Long imgId) throws IllegalAccessException {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        profileService.deleteProfileImage(id, imgId);
        return "deleted";
    }

    // ========================== 취미 ====================================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/hobby")
//    public List<HobbyRspDto> getHobby(HttpServletRequest request) {
    public HobbyRspDto getHobby(HttpServletRequest request) {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return profileService.getHobby(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/hobby/{uId}")
    public HobbyRspDto getFriendsHobby(@PathVariable Long uId) {
        return profileService.getHobby(uId);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/hobby")
    public HobbyRspDto addHobby(HttpServletRequest request, @RequestBody HobbyReqDto hobbyReqDto) {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return profileService.addHobby(id, hobbyReqDto);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/hobby")
    public HobbyRspDto deleteHobby(HttpServletRequest request, @RequestBody HobbyReqDto hobbyReqDto) {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return profileService.deleteHobby(id, hobbyReqDto);
    }

}
