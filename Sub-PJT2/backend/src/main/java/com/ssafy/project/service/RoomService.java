package com.ssafy.project.service;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.room.MeetingRoomStatus;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.response.OneRoomRspDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.GroupRoomRepository;
import com.ssafy.project.repository.OneRoomRepository;
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
    private final GroupService groupService;
    private final WebRtcService webRtcService;

    /**
     * 일대일 미팅방 입장
     */
    public OneRoomRspDto enterOneMeetRoom(Long userId) {
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("방에 들어가는 유저의 정보가 조회되지 않습니다."));

        if (user.getMeetingRoom() != null) {
            throw new IllegalStateException("이미 미팅룸에 들어간 사용자입니다.");
        }

        return oneRepository.findRamdomRoom(user)
            .map(room -> {
                log.info("room : " + room.getMaleUser().getUserName());
                log.info("room : " + room.getFemaleUser().getUserName());
                if(user.getUserGender() == Gender.MALE){
                    room.setMaleUser(user);
                }
                else if(user.getUserGender() == Gender.FEMALE){
                    room.setFemaleUser(user);
                }
                else {
                    throw new NotFoundException("들어갈 수 있는 방이 없습니다.");
                }
                log.info("room : " + room.getMaleUser().getUserName());
                log.info("room : " + room.getFemaleUser().getUserName());
                return room;
            })
                .map(OneRoomRspDto::new)
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
                .filter(room -> room.getMaleUser() != null && room.getFemaleUser() != null)
                .orElseThrow(() -> new NotFoundException("아직 대기 중인 방입니다."));
        try {
            String sessionId = webRtcService.initializeSession();
            meetingRoom.setSessionId(sessionId);
            webRtcService.createConnection(sessionId);
        } catch (OpenViduJavaClientException e) {
            throw new RuntimeException(e);
        } catch (OpenViduHttpException e) {
            throw new RuntimeException(e);
        }

        log.info("남자 아이디" + meetingRoom.getMaleUser().getId());
        log.info("남자 이름" + meetingRoom.getMaleUser().getUserName());
        log.info("여자 아이디" + meetingRoom.getFemaleUser().getId());
        log.info("여자 이름" + meetingRoom.getFemaleUser().getUserName());

        meetingRoom.changeStatus(MeetingRoomStatus.ACTIVE);
        chatService.enterMeetRoom(meetingRoom.getId());
        return new OneRoomRspDto(meetingRoom);
    }

    /**
     * 일대일 미팅방 퇴장
     */
    public OneRoomRspDto quitOneMeetRoom(Long userId) {
        User user = userService.findUser(userId).orElseThrow(() -> new NotFoundException("방을 나가는 유저의 정보가 조회되지 않습니다."));

        if(user.getMeetingRoom() == null){
            throw new IllegalStateException("해당 유저가 방에 존재 하지 않습니다.");
        }

        return findOneMeetRoom(user.getMeetingRoom().getId()).map(room ->{

            if(user.getUserGender() == Gender.MALE) {
                room.removeMaleUser();
            }
            else if(user.getUserGender() == Gender.FEMALE) {
                room.removeFemaleUser();
            }
            return room;})
                .map(OneRoomRspDto::new)
                .orElseThrow(() -> new NotFoundException("나가려는 방이 조회되지 않습니다."));
    }

    /**
     * 일대일 미팅방 종료
     */
    public OneRoomRspDto endOneMeetRoom(Long roomId) {
       return findOneMeetRoom(roomId)
               .filter(room -> room.getStatus().equals(MeetingRoomStatus.ACTIVE))
               .map(room -> {
                   room.removeMaleUser();
                   room.removeFemaleUser();
                   room.setSessionId(null);
                   room.changeStatus(MeetingRoomStatus.INACTIVE);
                   return room;
               })
               .map(OneRoomRspDto::new)
               .orElseThrow(() -> new NotFoundException("미팅이 진행중인 방이 조회되지 않아 종료할 수 없습니다."));
    }

    /**
     * 그룹 미팅방 입장
     */
//    public GroupRoomRspDto enterGroupMeetRoom(Long userId, Long groupId) {
//        User user = userService.findUser(userId)
//                .orElseThrow(() -> new NotFoundException("방에 들어가는 유저의 정보가 조회되지 않습니다."));
//
//        groupService.findMeetingGroup(groupId).map(group -> )
//                .orElseThrow(() -> new NotFoundException("방에 들어가는 그룹의 정보가 조회되지 않습니다."));
//
//    }





    private OneMeetingRoom saveOneMeetRoom(OneMeetingRoom oneMeetingRoom) {
        return oneRepository.save(oneMeetingRoom);
    }

    public Optional<OneMeetingRoom> findOneMeetRoom(Long roomId) {
        return Optional.ofNullable(roomId).flatMap(oneRepository::findById);
    }

    private GroupMeetingRoom saveGroupMeetRoom(GroupMeetingRoom groupMeetingRoom) {
        return groupRepository.save(groupMeetingRoom);
    }

    public Optional<GroupMeetingRoom> findGroupMeetRoom(Long roomId) {
        return Optional.ofNullable(roomId).flatMap(groupRepository::findById);
    }

}
