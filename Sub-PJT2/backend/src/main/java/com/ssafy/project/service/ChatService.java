package com.ssafy.project.service;

import com.ssafy.project.service.redis.RedisSubscriber;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {

    private final Map<Long, ChannelTopic> topics;  // 채팅방(Topic) 목록
    private final RedisSubscriber redisSubscriber;  // 구독 처리 서비스
    private final RedisMessageListenerContainer redisMessageListener;  // 미팅방(Topic)에 발행되는 메시지를 처리할 Listener(Subscriber)

    /**
     *  Redis 에 Topic 을 만들고 pub/sub 통신을 하기 위해 Listener 를 설정
     */
    public void enterChatRoom(Long id) {
        ChannelTopic topic = topics.get(id);
        if (topic == null) {
            topic = new ChannelTopic(id.toString());
            redisMessageListener.addMessageListener(redisSubscriber, topic);
            topics.put(id, topic);
        }
    }
}
