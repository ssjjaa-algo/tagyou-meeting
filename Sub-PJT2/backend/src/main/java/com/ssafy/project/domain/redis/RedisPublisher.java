package com.study.SpringBootWebSocketChatServer.redis;

import com.study.SpringBootWebSocketChatServer.domain.model.ChatMessage;
import com.study.SpringBootWebSocketChatServer.domain.model.ChatMessagePayload;
import com.study.SpringBootWebSocketChatServer.domain.model.MeetingRoom;
import com.study.SpringBootWebSocketChatServer.repository.ChatMessageRepository;
import com.study.SpringBootWebSocketChatServer.repository.MeetingRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
public class RedisPublisher {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private MeetingRoomRepository meetingRoomRepository;

    /**
     *  Description:
     *      - 메시지를 Redis Topic(채팅방 고유 아이디)에 발행(Publish)합니다.
     *
     */
    public void publish(ChannelTopic topic, ChatMessagePayload message) {
        MeetingRoom chatRoom = meetingRoomRepository.findById(message.getChatRoomId())
                .orElseGet(() -> MeetingRoom.getBuilder()
                        .withName(UUID.randomUUID().toString())
                        .build());

        ChatMessage publishedMessage = ChatMessage.getBuilder()
                .withChatRoom(chatRoom)
                .withContent(message.getContent())
                .withSender(message.getSender())
                .withType(message.getMessageType())
                .build();

        chatRoom.addMessage(publishedMessage);
        chatMessageRepository.save(publishedMessage);
        redisTemplate.convertAndSend(topic.getTopic(), message);
    }
}
