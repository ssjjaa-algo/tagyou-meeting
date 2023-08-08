package com.ssafy.project.controller;

import com.ssafy.project.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/users", produces = "application/json; charset=utf8")

public class CommentController {

    private final CommentService commentService;

    // ===================== 코멘트 조회 =========================


    // ===================== 코멘트 등록 =========================


    // ===================== 코멘트 수정 =========================


    // ===================== 코멘트 삭제 =========================



}
