package com.ssafy.project.controller;

import com.ssafy.project.dto.request.GroupReqDto;
import com.ssafy.project.dto.response.GroupRspDto;
import com.ssafy.project.dto.response.UserInfoRspDto;
import com.ssafy.project.service.GroupService;
import com.ssafy.project.service.TokenService;
import com.ssafy.project.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/groups", produces = "application/json; charset=utf8")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final TokenService tokenService;

    // ====================== 그룹 생성 ============================
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    public GroupRspDto createGroup(HttpServletRequest request){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.createGroup(userId);
    }

    // ====================== 그룹 초대 ============================
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/request")
    public GroupRspDto inviteGroup(HttpServletRequest request, @RequestBody GroupReqDto groupReqDto){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.inviteGroup(userId, groupReqDto);
    }

    // ====================== 그룹 수락 ============================
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/accept")
    public GroupRspDto acceptGroup(HttpServletRequest request, @RequestParam Long groupId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.acceptGroup(userId, groupId);
    }

    // ====================== 그룹 거절 ============================
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/reject")
    public GroupRspDto rejectGroup(HttpServletRequest request, @RequestParam Long groupId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.rejectGroup(userId, groupId);
    }

    // ====================== 그룹 탈퇴 ============================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/quit")
    public GroupRspDto quitGroup(HttpServletRequest request, @RequestParam Long groupId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.LeaveGroup(userId, groupId);
    }

    // ====================== 그룹 삭제 ============================
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{groupId}")
    public GroupRspDto removeGroup(HttpServletRequest request, @PathVariable Long groupId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.removeGroup(userId, groupId);
    }

}
