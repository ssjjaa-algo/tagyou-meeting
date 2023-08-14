package com.ssafy.project.controller;

import com.ssafy.project.domain.message.ChatMessageDto;
import com.ssafy.project.service.ChatService;
import com.ssafy.project.service.redis.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/chat")
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatService chatService;

    // ====================== 메시지 발행 ============================
    /**
     * @MessageMapping 을 통해 WebSocket 으로 들어오는 메시지를 발행
     * Client 에서는 prefix 를 붙여서 /pub/chat/message 로 발행 요청을 보내면 해당 메시지 처리
     */
    @MessageMapping("/message")
    public void sendMessage(ChatMessageDto message) {
        System.out.println("메시지 수신");
        System.out.println(message);
        String topic = message.getMeetingRoomId().toString();
        redisPublisher.publish(ChannelTopic.of(topic), message);
    }


    // ====================== 채팅 메시지 가져오기 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/rooms/{meetingRoomId}/messages")
    public List<ChatMessageDto> getChatMessages(@PathVariable("meetingRoomId") Long meetingRoomId) {
        return chatService.getChatMessages(meetingRoomId);
    }
}
