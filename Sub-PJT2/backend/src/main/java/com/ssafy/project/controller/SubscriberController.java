package com.study.SpringBootWebSocketChatServer.controller;

import com.study.SpringBootWebSocketChatServer.domain.model.MeetingRoom;
import com.study.SpringBootWebSocketChatServer.redis.RedisSubscriber;
import com.study.SpringBootWebSocketChatServer.repository.ChatMessageRepository;
import com.study.SpringBootWebSocketChatServer.repository.MeetingRoomRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
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

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private RedisSubscriber redisSubscriber;

    @Autowired
    private RedisMessageListenerContainer redisMessageListener;  // 채팅방(Topic)에 발행되는 메시지를 처리할 Listener(Subscriber)

    /**
     *  Description:
     *      - 채팅방 이름을 요청 파라미터로 전달해서 채팅방 개설
     */
    @PostMapping
    public MeetingRoom createChatRoom(@RequestParam String name) {
        MeetingRoom newChatRoom = MeetingRoom.getBuilder()
                .withName(name)
                .build();
        ChannelTopic topic = ChannelTopic.of(newChatRoom.getId().toString());
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        return meetingRoomRepository.save(newChatRoom);
    }

    /**
     *  Description:
     *      - 전체 채팅방 목록을 가져옵니다
     */
    @GetMapping
    public List<MeetingRoom> getChatRooms() {
        return meetingRoomRepository.findAll();
    }

    /**
     *  Description:
     *      - 해당 아이디를 가진 채팅방의 채팅을 가져옵니다
     */
    @GetMapping(path = "/rooms/{chatRoomId}/messages")
    public ResponseEntity<?> getChatMessages(@PathVariable("chatRoomId") Long chatRoomId) {
        MeetingRoom chatRoom = meetingRoomRepository.findById(chatRoomId).orElse(null);

        if (chatRoom != null) {
            return new ResponseEntity<>(chatRoom.getMessages(), HttpStatus.OK);
        }
        log.error("Error message - chat room not found with id: {}", chatRoomId);
        return new ResponseEntity<>("Error message - chat room not found", HttpStatus.NOT_FOUND);
    }
}
