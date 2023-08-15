package com.ssafy.project.attribute;

import com.ssafy.project.domain.constants.AuthConstants;
import com.ssafy.project.domain.message.ChatMessage;
import com.ssafy.project.domain.message.MessageType;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.request.RoomMessageReqDto;
import com.ssafy.project.dto.request.UserReqDto;
import com.ssafy.project.repository.OneRoomRepository;
import com.ssafy.project.repository.UserRepository;
import com.ssafy.project.service.ChatService;
import com.ssafy.project.service.TokenService;
import com.ssafy.project.service.UserService;
import com.ssafy.project.service.redis.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.Optional;

@Log4j2
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final TokenService tokenService;
    private final RedisTemplate redisTemplate;

//    private final RedisPublisher redisPublisher;
//    private final OneRoomRepository oneRoomRepository;
//    private final UserRepository memberRepository;
    private final ChatService chatService;
//    private final UserService userService;

    @Override // websocket을 통해 들어온 요청이 처리 되기 전 실행된다.
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        log.info("StompHandler로 들어오기는 한다!!");
//        String jwt = accessor.getFirstNativeHeader(AuthConstants.AUTHORIZATION_HEADER);
//        log.info("StompHandler JWT : " + jwt);
        log.info("무슨 메시지?: " + accessor.getCommand());
        if (StompCommand.CONNECT == accessor.getCommand()) {
            String jwt = accessor.getFirstNativeHeader(AuthConstants.AUTHORIZATION_HEADER);
            log.info("StompHandler JWT : " + jwt);
            if (StringUtils.hasText(jwt)) {
//                String accessToken = jwt.substring(7, jwt.length());
                String accessToken = jwt;
                log.info("StompHandler AccessToken : " + accessToken);

                boolean validToken = false;
                try {
                    validToken = tokenService.verifyToken(accessToken);
                } catch (IOException e) {
                    log.info("Exception occurred");
                    throw new RuntimeException(e);
                }
                log.info("ValidToken : " + validToken);

                Long uid = tokenService.parseUId(accessToken);
                if (!validToken) {
                    return null;
                } else{
                    chatService.enterMeetRoom(Long.parseLong(accessor.getFirstNativeHeader(AuthConstants.ROOM_ID)));
                }
            }
        }
        if (StompCommand.SUBSCRIBE == accessor.getCommand()) {
            // 기존 아재 코드
            // 채팅방에 들어온 클라이언트 sessionId를 roomId와 맵핑해 놓는다.(나중에 특정 세션이 어떤 채팅방에 들어가 있는지 알기 위함)
//            String roomId = Optional.ofNullable((String) message.getHeaders().get("RoomId")).orElse("InvalidRoomId");
            String roomId = Optional.ofNullable((String) accessor.getFirstNativeHeader(AuthConstants.ROOM_ID)).orElse("InvalidRoomId");
            log.info("roomId : " + roomId);

            String jwt = accessor.getFirstNativeHeader(AuthConstants.AUTHORIZATION_HEADER);
            String accessToken = jwt;
            Long uId = tokenService.parseUId(accessToken);

            // DB연동을 안했으니 이메일 정보로 유저를 만들어주겠습니다
            UserReqDto userReqDto = new UserReqDto(uId, "email", "이름");

            log.info("user : " + uId);
            log.info("userInfo : " + userReqDto.getEmail());

            // 입장메시지?같은데 뭔지 잘 모르겠음
//            oneRoomRepository.setUserEnterInfo(user, roomId);

            // 방이랑 유저 연결하는 부분같음
//            User u = userService.connectMemberAndChatRoom(roomId, user);

//            RoomMessageReqDto chatMessage = new RoomMessageReqDto();
//
//            // 클라이언트 입장 메시지를 채팅방에 발송한다.(redis publish)
//            redisTemplate.convertAndSend(roomId, ChatMessage.builder().messageType(MessageType.ENTER).content("입장").build());
//            redisPublisher.publish(ChannelTopic.of(roomId), uId, RoomMessageReqDto.builder().messageType(MessageType.ENTER).content("내용").meetingRoomId(Long.parseLong(roomId)).build());
        }
//        } else if (StompCommand.DISCONNECT == accessor.getCommand()) { // Websocket 연결 종료
//            // 연결이 종료된 클라이언트 sesssionId로 채팅방 id를 얻는다.
//            String sessionId = (String) message.getHeaders().get("simpSessionId");
//            String roomId = oneRoomRepository.getUserEnterRoomId(sessionId);
//            // 클라이언트 퇴장 메시지를 채팅방에 발송한다.(redis publish)
//            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("UnknownUser");
//            chatService.sendChatMessage(ChatMessage.builder().type(ChatMessage.MessageType.QUIT).roomId(roomId).sender(name).build());
//            // 퇴장한 클라이언트의 roomId 맵핑 정보를 삭제한다.
//            oneRoomRepository.removeUserEnterInfo(sessionId);
//            log.info("DISCONNECTED {}, {}", sessionId, roomId);
//        }
        return message;
    }

}