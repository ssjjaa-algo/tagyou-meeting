//package com.ssafy.project.controller;
//
//import com.ssafy.project.domain.room.MeetingRoom;
//import com.ssafy.project.domain.room.OneMeetingRoom;
//import com.ssafy.project.dto.response.OneRoomRspDto;
//import com.ssafy.project.repository.OneMeetingRoomRepository;
//import com.ssafy.project.service.ChatService;
//import com.ssafy.project.service.RoomService;
//import com.ssafy.project.service.TokenService;
//import jakarta.servlet.http.HttpServletRequest;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequiredArgsConstructor
//@RequestMapping(value = "/rooms", produces = "application/json; charset=utf8")
//public class RoomController {
//
//    private final TokenService tokenService;
//    private final RoomService roomService;
//    private final ChatService chatService;
//
//    // ====================== 일대일 미팅방 입장 ============================
//    @PostMapping
//    @RequestMapping("/one")
//    public OneRoomRspDto enterOneMeetRoom(HttpServletRequest request) {
//        Long userId = tokenService.parseUId(request.getHeader("Auth"));
//        return roomService.enterOneMeetRoom(userId);
//    }
//
//    // ====================== 일대일 미팅방 시작 ============================
//    @ResponseStatus(HttpStatus.OK)
//    @GetMapping(path = "/one/{roomId}")
//    public OneRoomRspDto startOneMeetRoom(@PathVariable Long roomId) {
//        MeetingRoom meetingRoom = oneMeetingRoomRepository.findById(roomId)
//                .orElseThrow(() -> new IllegalArgumentException("해당 방에 입장 불가능합니다."));
//        chatService.enterMeetRoom(meetingRoom.getId());
//        return meetingRoom;
//    }
//
//    // ====================== 그룹 미팅방 입장 ============================
//    @PostMapping
//    @RequestMapping("/groups")
//    public OneRoomRspDto createGroupMeetRoom(HttpServletRequest request) {
//        Long userId = tokenService.parseUId(request.getHeader("Auth"));
//        return roomService.enterOneMeetRoom(userId);
//    }
//
//    // ====================== 그룹 미팅방 시작 ============================
//    @ResponseStatus(HttpStatus.OK)
//    @GetMapping(path = "/groups/{roomId}")
//    public MeetingRoom startGroupMeetRoom(@PathVariable Long roomId) {
//        MeetingRoom meetingRoom = oneMeetingRoomRepository.findById(roomId)
//                .orElseThrow(() -> new IllegalArgumentException("해당 방에 입장 불가능합니다."));
//        chatService.enterMeetRoom(meetingRoom.getId());
//        return meetingRoom;
//    }
//
//
//    // ====================== 미팅방 목록 ============================
//    @GetMapping
//    public List<OneMeetingRoom> getMeetingRooms() {
//        return oneMeetingRoomRepository.findAll();
//    }
//}
