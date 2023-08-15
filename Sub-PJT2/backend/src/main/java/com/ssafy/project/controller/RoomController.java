package com.ssafy.project.controller;

import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.dto.response.OneRoomRspDto;
import com.ssafy.project.service.ChatService;
import com.ssafy.project.service.RoomService;
import com.ssafy.project.service.TokenService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/rooms", produces = "application/json; charset=utf8")
@Tag(name = "방 room", description = "meeting room 관련 API")
public class RoomController {

    private final TokenService tokenService;
    private final RoomService roomService;
    private final ChatService chatService;

    // ====================== 미팅방 조회 ============================
    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/one")
    public OneRoomRspDto getRoom(HttpServletRequest request) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return roomService.enterOneMeetRoom(userId);
    }

    // ====================== 일대일 미팅방 입장 ============================
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/one")
    public OneRoomRspDto enterOneMeetRoom(HttpServletRequest request) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return roomService.enterOneMeetRoom(userId);
    }

    // ====================== 일대일 미팅방 나가기 ============================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "/one/quit")
    public OneRoomRspDto quitOneMeetRoom(HttpServletRequest request) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return roomService.quitOneMeetRoom(userId);
    }

    // ====================== 일대일 미팅방 시작 ============================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "/one/{roomId}")
    public OneRoomRspDto startOneMeetRoom(@PathVariable Long roomId) {
        return roomService.startOneMeetRoom(roomId);
    }

//     ====================== 일대일 미팅방 종료 ============================
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping(path = "/one/{roomId}")
    public OneRoomRspDto endOneMeetRoom(@PathVariable Long roomId) {
        return roomService.endOneMeetRoom(roomId);
    }

    // ====================== 그룹 미팅방 입장 ============================
//    @PostMapping
//    @RequestMapping("/groups")
//    public OneRoomRspDto createGroupMeetRoom(HttpServletRequest request, Long groupId) {
//        Long userId = tokenService.parseUId(request.getHeader("Auth"));
//        return roomService.enterGroupMeetRoom(userId, groupId);
//    }
////
//    // ====================== 그룹 미팅방 시작 ============================
//    @ResponseStatus(HttpStatus.OK)
//    @GetMapping(path = "/groups/{roomId}")
//    public MeetingRoom startGroupMeetRoom(@PathVariable Long roomId) {
//        MeetingRoom meetingRoom = oneMeetingRoomRepository.findById(roomId)
//                .orElseThrow(() -> new IllegalArgumentException("해당 방에 입장 불가능합니다."));
//        chatService.enterMeetRoom(meetingRoom.getId());
//        return meetingRoom;
//    }

}
