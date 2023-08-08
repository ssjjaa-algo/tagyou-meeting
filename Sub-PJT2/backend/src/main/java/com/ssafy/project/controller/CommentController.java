package com.ssafy.project.controller;

<<<<<<< HEAD
//import com.ssafy.project.service.CommentService;
=======
import com.ssafy.project.dto.request.CommentReqDto;
import com.ssafy.project.dto.response.CommentRspDto;
import com.ssafy.project.service.CommentService;
import com.ssafy.project.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
>>>>>>> 20bf9e0694d72db6306fa95b4dd146a0392e18b1
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/comments", produces = "application/json; charset=utf8")

public class CommentController {

<<<<<<< HEAD
//    private final CommentService commentService;
=======
    private final CommentService commentService;
    private final TokenService tokenService;
>>>>>>> 20bf9e0694d72db6306fa95b4dd146a0392e18b1

    // ===================== 코멘트 조회 =========================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{profileId}")
    public List<CommentRspDto> getComments(@PathVariable String profileId) {
        Long pId = Long.parseLong(profileId);
        return commentService.getComments(pId);
    }


    // ===================== 코멘트 등록 =========================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/{profileId}")
    public CommentRspDto postComments(HttpServletRequest request, @RequestBody CommentReqDto commentReqDto,
                                            @PathVariable String profileId) {
        Long uId = tokenService.parseUId(request.getHeader("Auth"));
        return commentService.postComment(uId, Long.parseLong(profileId), commentReqDto);
    }

    // ===================== 코멘트 수정 =========================
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{commentId}")
    public CommentRspDto editComments(HttpServletRequest request, @RequestBody CommentReqDto commentReqDto,
                                      @PathVariable String commentId) throws IllegalAccessException {
        Long uId = tokenService.parseUId(request.getHeader("Auth"));
        return commentService.editComment(uId, Long.parseLong(commentId), commentReqDto);
    }

    // ===================== 코멘트 삭제 =========================
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("{commentId}")
    public String deleteComments(HttpServletRequest request, @PathVariable String commentId) throws IllegalAccessException {
        Long uId = tokenService.parseUId(request.getHeader("Auth"));
        return commentService.deleteComment(uId, Long.parseLong(commentId));
    }

}
