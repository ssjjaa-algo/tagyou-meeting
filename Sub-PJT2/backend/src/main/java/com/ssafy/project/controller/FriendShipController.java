package com.ssafy.project.controller;

import com.ssafy.project.domain.friend.FriendShipStatus;
import com.ssafy.project.dto.response.FriendRspDto;
import com.ssafy.project.service.FriendShipService;
import com.ssafy.project.service.TokenService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/friends", produces = "application/json; charset=utf8")
@RequiredArgsConstructor
@Tag(name = "친구", description = "friend ship 관련 API")
public class FriendShipController {

    private final FriendShipService friendShipService;
    private final TokenService tokenService;

    // ====================== 친구 요청 ============================
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/request")
    public FriendRspDto requestFriend(HttpServletRequest request,
                                      @RequestParam Long targetId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return friendShipService.requestFriendShip(userId, targetId);
    }

    // ====================== 요청 수락 ============================
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/accept")
    public FriendRspDto acceptFriend(HttpServletRequest request,
                                     @RequestParam Long targetId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return friendShipService.requestFriendShip(userId, targetId);
    }

    // ====================== 친구 리스트 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/list")
    public List<FriendRspDto> friendsList(HttpServletRequest request){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return friendShipService.findFriendShips(userId);
    }

    // ====================== 친구 차단 ============================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/block")
    public FriendRspDto blockFriend(HttpServletRequest request,
                                    @RequestParam Long friendId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return friendShipService.blockFriendShip(userId, friendId);
    }

    // ====================== 사용자 검색 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/search")
    public List<FriendRspDto> findUsers(HttpServletRequest request,
                                        @RequestParam(required = false) String keyword,
                                        @RequestParam(required = false) FriendShipStatus status){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return friendShipService.findUsers(userId, keyword, status);
    }

}
