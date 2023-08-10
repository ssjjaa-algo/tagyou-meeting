package com.ssafy.project.service;

import com.ssafy.project.domain.message.ChatMessagePayload;
import com.ssafy.project.repository.ChatMessageRepository;
import com.ssafy.project.service.redis.RedisSubscriber;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final RedisSubscriber redisSubscriber;  // 구독 처리 서비스
    private final RedisMessageListenerContainer redisMessageListenerContainer;  // 채팅방(Topic)에 발행되는 메시지를 처리할 Listener(Subscriber)
    private final ChatMessageRepository chatMessageRepository;

    private Map<String, ChannelTopic> topics;

    @PostConstruct
    private void init() {
        topics = new HashMap<>();
    }

    /**
     *   Redis 에 Topic 을 만들고 pub/sub 통신을 하기 위해 Listener 를 설정
     */
    public void enterMeetRoom(Long id) {
        ChannelTopic topic = topics.get(id);
        if (topic == null) {
            topic = new ChannelTopic(id.toString());
            redisMessageListenerContainer.addMessageListener(redisSubscriber, topic);
            topics.put(id.toString(), topic);
        }
    }

    /**
     *  해당 방의 전체 채팅 리스트를 가져옵니다.
     */
    public List<ChatMessagePayload> getChatMessages(Long roomId) {
        return chatMessageRepository.findAllByMeetingRoomId(roomId).orElseGet(() -> null)
                .stream().map(ChatMessagePayload::new).toList();
    }
}
