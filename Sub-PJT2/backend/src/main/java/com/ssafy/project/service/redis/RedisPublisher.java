package com.ssafy.project.service.redis;

import com.ssafy.project.domain.message.ChatMessage;
import com.ssafy.project.domain.message.ChatMessagePayload;
import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.repository.ChatMessageRepository;
import com.ssafy.project.repository.MeetingRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ChatMessageRepository chatMessageRepository;
    private final MeetingRoomRepository meetingRoomRepository;

    /**
     *  메시지를 Redis Topic(채팅방 고유 아이디)에 발행(Publish)합니다.
     */
    public void publish(ChannelTopic topic, ChatMessagePayload message) {
        MeetingRoom meetingRoom = meetingRoomRepository.findById(message.getMeetingRoomId())
                .orElseThrow(()-> new IllegalArgumentException("존재하지 않는 게임방입니다."));

        ChatMessage publishedMessage = ChatMessage.builder()
                .content(message.getContent())
                .type(message.getMessageType())
                .sender(message.getSender())
                .meetingRoom(meetingRoom)
                .build();

        meetingRoom.addMessage(publishedMessage);
        chatMessageRepository.save(publishedMessage);
        redisTemplate.convertAndSend(topic.getTopic(), message.getMeetingRoomId());
    }
}
