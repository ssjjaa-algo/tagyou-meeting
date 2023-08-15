package com.ssafy.project.service.redis;

import com.ssafy.project.domain.message.ChatMessage;
import com.ssafy.project.dto.request.RoomMessageReqDto;
import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.ChatMessageRepository;
import com.ssafy.project.repository.OneRoomRepository;
import com.ssafy.project.repository.UserRepository;
import com.ssafy.project.service.ChatService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;


@Slf4j
@RequiredArgsConstructor
@Service
@EnableWebSocketMessageBroker
public class RedisPublisher{
    private final UserRepository userRepository;

    private final RedisTemplate<String, Object> redisTemplate;
    private final ChatMessageRepository chatMessageRepository;
    private final OneRoomRepository oneRoomRepository;

    /**
     *      - 메시지를 Redis Topic(채팅방 고유 아이디)에 발행(Publish)합니다.
     */
    public void publish(ChannelTopic topic, Long userId, RoomMessageReqDto message) {
        log.info("InComming ChatService");
        log.info(topic.getTopic());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("전송 유저를 찾을 수 없습니다."));
        log.info(user.getUserEmail());
        MeetingRoom meetingRoom = oneRoomRepository.findById(message.getMeetingRoomId())
                .orElseThrow(() -> new EntityNotFoundException("채팅방을 찾을 수 없습니다."));
        log.info(meetingRoom.getId()+"");
        // 채팅방 입장시에는 대화명과 메시지를 자동으로 세팅한다.
        ChatMessage publishedMessage = ChatMessage.builder()
                .meetingRoom(meetingRoom)
                .content(message.getContent())
                .sender(user)
                .messageType(message.getMessageType())
                .build();
        log.info(publishedMessage.getContent());
        chatMessageRepository.save(publishedMessage);
        log.info("여까진 온다.");
        redisTemplate.convertAndSend(topic.getTopic(), publishedMessage);
    }
}
