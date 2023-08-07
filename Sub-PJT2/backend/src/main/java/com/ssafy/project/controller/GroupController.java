package com.ssafy.project.controller;

import com.ssafy.project.dto.request.GroupReqDto;
import com.ssafy.project.dto.response.GroupRspDto;
import com.ssafy.project.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value="/groups", produces = "application/json; charset=utf8")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    // ====================== 그룹 생성 ============================
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    public GroupRspDto createGroup(@RequestBody Long userId){
        return groupService.createGroup(userId);
    }

    // ====================== 그룹 초대 ============================
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/request")
    public GroupRspDto inviteGroup(@RequestBody GroupReqDto groupReqDto){
        return groupService.inviteGroup(groupReqDto);
    }

    // ====================== 그룹 수락 ============================
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/accept")
    public GroupRspDto acceptGroup(@RequestBody GroupReqDto groupReqDto){
        return groupService.acceptGroup(groupReqDto);
    }

    // ====================== 그룹 탈퇴 ============================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/{groupId}/quit")
    public GroupRspDto quitGroup(@PathVariable Long groupId,
                                 @RequestParam Long userId){
        return groupService.LeaveGroup(groupId, userId);
    }

    // ====================== 그룹 삭제 ============================
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{groupId}")
    public GroupRspDto removeGroup(@PathVariable Long groupId,
                                   @RequestParam Long userId){
        return groupService.removeGroup(groupId, userId);
    }

}
