package com.ssafy.project.controller;

import com.ssafy.project.domain.friend.FriendShipStatus;
import com.ssafy.project.dto.request.FriendReqDto;
import com.ssafy.project.dto.response.FriendRspDto;
import com.ssafy.project.service.FriendShipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(value="/friends", produces = "application/json; charset=utf8")
@RequiredArgsConstructor
public class FriendShipController {

    private final FriendShipService friendShipService;

    // ====================== 친구 요청 ============================
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/request")
    public FriendRspDto requestFriend(@RequestBody FriendReqDto friendReqDto){
        return friendShipService.requestFriendShip(friendReqDto);
    }

    // ====================== 요청 수락 ============================
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/accept")
    public FriendRspDto acceptFriend(@RequestBody FriendReqDto friendReqDto){
        return friendShipService.acceptFriendShip(friendReqDto);
    }

    // ====================== 친구 리스트 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{userId}")
    public List<FriendRspDto> friendsList(@PathVariable Long userId){
        return friendShipService.findFriendShips(userId);
    }

    // ====================== 친구 차단 ============================
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{userId}")
    public FriendRspDto blockFriend(@PathVariable Long userId,
                                    @RequestParam Long friendId){
        return friendShipService.blockFriendShip(userId, friendId);
    }

    // ====================== 사용자 검색 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/search/{userId}")
    public List<FriendRspDto> findUsers(@PathVariable Long userId,
                                        @RequestParam(required = false) String keyword,
                                        @RequestParam(required = false) FriendShipStatus status){
        return friendShipService.findUsers(userId, keyword, status);
    }

}
