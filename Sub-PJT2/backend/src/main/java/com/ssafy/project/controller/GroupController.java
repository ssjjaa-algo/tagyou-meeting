package com.ssafy.project.controller;

import com.ssafy.project.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    // ====================== 그룹 생성 ============================

    // ====================== 그룹 초대 ============================

    // ====================== 그룹 탈퇴 ============================

    // ====================== 그룹 삭제 ============================


}
