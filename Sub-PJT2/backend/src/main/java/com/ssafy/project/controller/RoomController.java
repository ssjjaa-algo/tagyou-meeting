package com.ssafy.project.controller;

import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.MeetingRoomRepository;
import com.ssafy.project.service.UserService;
import com.ssafy.project.service.redis.RedisSubscriber;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/rooms", produces = "application/json; charset=utf8")
public class RoomController {

    private final RedisSubscriber redisSubscriber;
    private final RedisMessageListenerContainer redisMessageListener;  // 채팅방(Topic)에 발행되는 메시지를 처리할 Listener(Subscriber)
    private final UserService userService;
    private final MeetingRoomRepository meetingRoomRepository;


    // ====================== 미팅방 개설 ============================
    @PostMapping
    public MeetingRoom createChatRoom() {
        User f1 = userService.findUser(1L).orElseThrow(() ->new NotFoundException("user not found"));
        User m1 = userService.findUser(2L).orElseThrow(() ->new NotFoundException("user not found"));
        MeetingRoom newRoom = OneMeetingRoom.builder().maleUser(m1).femaleUser(f1).build();
        meetingRoomRepository.save(newRoom);

        //        MeetingRoom newRoom = MeetingRoom.getBuilder()
//                        .withName(name)
//                        .build();
        ChannelTopic topic = ChannelTopic.of(newRoom.getId().toString());
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        return newRoom;
    }

    // ====================== 미팅방 목록 ============================
    @GetMapping
    public List<MeetingRoom> getMeetingRooms() {
        return meetingRoomRepository.findAll();
    }
}
