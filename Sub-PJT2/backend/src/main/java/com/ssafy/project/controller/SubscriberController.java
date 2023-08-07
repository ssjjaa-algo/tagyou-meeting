package com.ssafy.project.controller;

import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.repository.ChatMessageRepository;
import com.ssafy.project.repository.MeetingRoomRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(path = "/chat")
public class SubscriberController {

    @Autowired
    private MeetingRoomRepository meetingRoomRepository;




    // ====================== 해당 아이디 채팅 ============================
    @GetMapping(path = "/rooms/{meetingRoomId}/messages")
    public ResponseEntity<?> getChatMessages(@PathVariable("meetingRoomId") Long meetingRoomId) {
        MeetingRoom meetingRoom = meetingRoomRepository.findById(meetingRoomId).orElse(null);

        if (meetingRoom != null) {
            return new ResponseEntity<>(meetingRoom.getMessages(), HttpStatus.OK);
        }
        log.error("Error message - chat room not found with id: {}", meetingRoomId);
        return new ResponseEntity<>("Error message - chat room not found", HttpStatus.NOT_FOUND);
    }
}
