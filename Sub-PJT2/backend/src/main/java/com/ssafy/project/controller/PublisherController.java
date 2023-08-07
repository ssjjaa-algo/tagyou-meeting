package com.ssafy.project.controller;

import com.ssafy.project.domain.message.ChatMessagePayload;
import com.ssafy.project.service.redis.RedisPublisher;
import com.ssafy.project.service.ChatService;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PublisherController {

    @Resource(name = "redisPublisher")
    private final RedisPublisher redisPublisher;

    // ====================== 메시지 발행 ============================
    // @MessageMapping 을 통해 WebSocket 으로 들어오는 메시지를 발행
    // Client 에서는 prefix 를 붙여서 /pub/chat/message 로 발행 요청을 보내면 해당 메시지 처리
    @MessageMapping(value = "/chat/message")
    public void sendMessage(ChatMessagePayload message) {
        String topic = message.getMeetingRoomId().toString();
        redisPublisher.publish(ChannelTopic.of(topic), message);
    }
}
