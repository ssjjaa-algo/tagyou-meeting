package com.ssafy.project.service;

import com.ssafy.project.domain.room.MeetingRoomStatus;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.response.OneRoomRspDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.GroupRoomRepository;
import com.ssafy.project.repository.OneRoomRepository;
import com.ssafy.project.repository.UserRepository;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {
    private final OneRoomRepository oneRepository;
    private final GroupRoomRepository groupRepository;
    private final ChatService chatService;
    private final UserService userService;
    private final WebRtcService webRtcService;

    /**
     * 일대일 미팅방 입장
     */
    public OneRoomRspDto enterOneMeetRoom(Long userId) {
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("방에 들어가는 유저의 정보가 조회되지 않습니다."));

        return oneRepository.findRamdomRoom(user.getUserGender())
            .map(room -> {
                if(room.getMaleUser() == null) {
                    room.setMaleUser(user);
                } else if(room.getFemaleUser() == null) {
                    room.setFemaleUser(user);
                } else {
                    throw new NotFoundException("들어갈 수 있는 방이 없습니다.");
                }
                return room;
        }).map(OneRoomRspDto::new)
                .orElseGet(() -> createOneMeetRoom(userId));
    }

    /**
     * 일대일 미팅방 개설
     */
    public OneRoomRspDto createOneMeetRoom(Long userId) {
        log.info("createOneMeetRoom : " + userId);
        OneMeetingRoom newRoom = OneMeetingRoom.builder()
                .newUser(userService.findUser(userId)
                        .orElseThrow(() -> new NotFoundException("유저의 정보가 조회되지 않습니다.")))
                .build();
        saveOneMeetRoom(newRoom);
        return new OneRoomRspDto(newRoom);
    }

    /**
     * 일대일 미팅방 시작
     */
    public OneRoomRspDto startOneMeetRoom(Long roomId) {
        OneMeetingRoom meetingRoom = findOneMeetRoom(roomId)
                .orElseThrow(() -> new NotFoundException("방이 조회되지 않아 시작할 수 없습니다."));
        try {
            String sessionId = webRtcService.initializeSession();
            meetingRoom.setSessionId(sessionId);
            webRtcService.createConnection(sessionId);
//            webRtcService.createConnection(sessionId, meetingRoom.getMaleUser().getId());
        } catch (OpenViduJavaClientException e) {
            throw new RuntimeException(e);
        } catch (OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
        meetingRoom.changeStatus(MeetingRoomStatus.ACTIVE);
        chatService.enterMeetRoom(meetingRoom.getId());
        return new OneRoomRspDto(meetingRoom);
    }

    /**
     * 일대일 미팅방 퇴장
     */
    public OneRoomRspDto quitOneMeetRoom(Long userId, Long roomId) {
        userService.findUser(userId).orElseThrow(() -> new NotFoundException("방을 나가는 유저의 정보가 조회되지 않습니다."));
        return findOneMeetRoom(roomId).map(room ->{

            if(room.getMaleUser().getId().equals(userId)) {
                room.setMaleUser(null);
            } else if(room.getFemaleUser().getId().equals(userId)) {
                room.setFemaleUser(null);
            }
            else throw new NotFoundException("해당 유저가 방에 존재 하지 않습니다.");

            return room;})
                .map(OneRoomRspDto::new)
                .orElseThrow(() -> new NotFoundException("나가려는 방이 조회되지 않습니다."));
    }

    /**
     * 일대일 미팅방 종료
     */
    public OneRoomRspDto endOneMeetRoom(Long roomId) {
       return findOneMeetRoom(roomId)
               .map(room -> {
                   room.setMaleUser(null);
                   room.setFemaleUser(null);
                   room.setSessionId(null);
                   room.changeStatus(MeetingRoomStatus.INACTIVE);
                   return room;
               })
               .map(OneRoomRspDto::new)
               .orElseThrow(() -> new NotFoundException("방이 조회되지 않아 종료할 수 없습니다."));
    }

    /**
     * 그룹 미팅방 개설 확인
     */





    private Optional<OneMeetingRoom> findOneMeetRoom(Long roomId) {
        return oneRepository.findById(roomId);
    }
    private OneMeetingRoom saveOneMeetRoom(OneMeetingRoom oneMeetingRoom) {
        return oneRepository.save(oneMeetingRoom);
    }


}
