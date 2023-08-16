package com.ssafy.project.service;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.domain.room.MeetingRoomStatus;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.response.GroupRoomRspDto;
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

import java.util.List;
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

    // 임시
    public OneRoomRspDto getRoom(Long roomId) {
        return oneRepository.findById(roomId).map(OneRoomRspDto::new)
                .orElseThrow(() -> new NotFoundException("방이 조회되지 않습니다."));
    }

    /**
     * 일대일 미팅방 입장
     */
    public OneRoomRspDto enterOneMeetRoom(Long userId) {
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("일대일 미팅룸에 들어가는 유저의 정보가 조회되지 않습니다."));

        userService.checkUserGender(user);

        if (user.getMeetingRoom() != null) {
            throw new IllegalStateException("이미 미팅룸에 들어간 사용자입니다.");
        }

        return oneRepository.findRamdomRoom(user)
            .map(room -> {
                if(user.getUserGender() == Gender.MALE){
                    room.setMaleUser(user);
                }
                else if(user.getUserGender() == Gender.FEMALE){
                    room.setFemaleUser(user);
                }
                else {
                    throw new NotFoundException("들어갈 수 있는 일대일 미팅룸이 없습니다.");
                }
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
        OneMeetingRoom newOneRoom = OneMeetingRoom.builder()
                .newUser(userService.findUser(userId)
                        .orElseThrow(() -> new NotFoundException("유저의 정보가 조회되지 않습니다.")))
                .build();
        return saveOneMeetRoom(newOneRoom).map(OneRoomRspDto::new)
                .orElseThrow(() -> new NotFoundException("일대일 미팅룸을 생성하는데 실패했습니다."));
    }

    /**
     * 일대일 미팅방 시작
     */
    public OneRoomRspDto startOneMeetRoom(Long roomId) {
        OneMeetingRoom meetingRoom = findOneMeetRoom(roomId)
                .filter(room -> room.getMaleUser() != null && room.getFemaleUser() != null)
                .orElseThrow(() -> new NotFoundException("아직 대기 중인 일대일 미팅룸입니다."));

        connectWebService(meetingRoom);
        return new OneRoomRspDto(meetingRoom);
    }

    /**
     * 일대일 미팅방 퇴장
     */
    public OneRoomRspDto quitOneMeetRoom(Long userId) {
        User user = userService.findUser(userId).orElseThrow(() -> new NotFoundException("일대일 미팅룸을 나가는 유저의 정보가 조회되지 않습니다."));

        if(user.getMeetingRoom() == null){
            throw new IllegalStateException("해당 유저가 대기방에 존재 하지 않습니다.");
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
                .orElseThrow(() -> new NotFoundException("나가려는 일대일 미팅룸이 조회되지 않습니다."));
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
               .orElseThrow(() -> new NotFoundException("미팅이 진행중인 일대일 미팅룸이 조회되지 않아 종료할 수 없습니다."));
    }

    /**
     * 그룹 미팅방 입장
     */
    public GroupRoomRspDto enterGroupMeetRoom(Long userId, Long groupId) {
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹 미팅룸에 들어가는 유저의 정보가 조회되지 않습니다."));
        MeetingGroup group = groupService.findMeetingGroup(groupId)
                .orElseThrow(() -> new NotFoundException("그룹 미팅룸에 들어가는 그룹의 정보가 조회되지 않습니다."));

        List<User> groupUser = group.getGroupUser();

        if(user != groupUser.get(0)){
            throw new IllegalStateException("그룹장이 아니라 입장 할 수 없습니다.");
        }

        if (user.getMeetingRoom() != null) {
            throw new IllegalStateException("이미 미팅룸에 들어간 그룹장입니다.");
        }

        return groupRepository.findRamdomRoom(group)
                .map(room -> {
                    if(group.getGroupGender() == Gender.MALE){
                        room.addMaleUserList(group);
                    }
                    else if(group.getGroupGender() == Gender.FEMALE){
                        room.addFemaleUserList(group);
                    }
                    else {
                        throw new NotFoundException("들어갈 수 있는 미팅룸이 없습니다.");
                    }
                    return room;
                })
                .map(GroupRoomRspDto::new)
                .orElseGet(() -> createGroupMeetRoom(groupId));


    }

    private GroupRoomRspDto createGroupMeetRoom(Long groupId) {
        log.info("createGroupMeetRoom : " + groupId);

        GroupMeetingRoom newGroupRoom = GroupMeetingRoom.builder()
                .newGroup(groupService.findMeetingGroup(groupId)
                        .orElseThrow(() -> new NotFoundException("그룹의 정보가 조회되지 않습니다.")))
                .build();

        return saveGroupMeetRoom(newGroupRoom).map(GroupRoomRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹 미팅룸을 생성하는데 실패했습니다."));
    }

    /**
     * 그룹 미팅방 시작
     */
    public GroupRoomRspDto startGroupMeetRoom(Long roomId) {
        GroupMeetingRoom meetingRoom = findGroupMeetRoom(roomId)
                .filter(room -> room.getMaleList().size() == 3 && room.getFemaleList().size() == 3)
                .orElseThrow(() -> new NotFoundException("아직 대기 중인 그룹 미팅룸입니다."));

        connectWebService(meetingRoom);
        return new GroupRoomRspDto(meetingRoom);
    }

    /**
     * 그룹 미팅방 퇴장
     */
    public GroupRoomRspDto quitGroupMeetRoom(Long userId, Long groupId) {
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹 미팅룸에 들어가는 유저의 정보가 조회되지 않습니다."));
        MeetingGroup group = groupService.findMeetingGroup(groupId)
                .orElseThrow(() -> new NotFoundException("그룹 미팅룸에 들어가는 그룹의 정보가 조회되지 않습니다."));

        List<User> groupUser = group.getGroupUser();

        if(user != groupUser.get(0)){
            throw new IllegalStateException("그룹장이 아니라 퇴장 할 수 없습니다.");
        }

        return findGroupMeetRoom(user.getMeetingRoom().getId()).map(room ->{

                    if(user.getUserGender() == Gender.MALE) {
                        room.removeMaleUserList();
                    }
                    else if(user.getUserGender() == Gender.FEMALE) {
                        room.removeFemaleUserList();
                    }
                    return room;})
                .map(GroupRoomRspDto::new)
                .orElseThrow(() -> new NotFoundException("나가려는 그룹 미팅룸이 조회되지 않습니다."));
    }


    /**
     * 그룹 미팅방 종료
     */
    public GroupRoomRspDto endGroupMeetRoom(Long roomId) {
        return findGroupMeetRoom(roomId)
                .filter(room -> room.getStatus().equals(MeetingRoomStatus.ACTIVE))
                .map(room -> {
                    room.removeMaleUserList();
                    room.removeFemaleUserList();
                    room.setSessionId(null);
                    room.changeStatus(MeetingRoomStatus.INACTIVE);
                    return room;
                })
                .map(GroupRoomRspDto::new)
                .orElseThrow(() -> new NotFoundException("미팅이 진행중인 일대일 미팅룸이 조회되지 않아 종료할 수 없습니다."));
    }

    public void connectWebService(MeetingRoom meetingRoom){
        if(meetingRoom.getStatus() == MeetingRoomStatus.ACTIVE){
            throw new IllegalStateException("이미 시작된 미팅룸입니다.");
        }

        try {
            String sessionId = webRtcService.initializeSession();
            meetingRoom.setSessionId(sessionId);
            webRtcService.createConnection(sessionId);
        } catch (OpenViduJavaClientException e) {
            throw new RuntimeException(e);
        } catch (OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
        meetingRoom.changeStatus(MeetingRoomStatus.ACTIVE);
        chatService.enterMeetRoom(meetingRoom.getId());
    }

    private Optional<OneMeetingRoom> saveOneMeetRoom(OneMeetingRoom oneMeetingRoom) {
        return Optional.ofNullable(oneRepository.save(oneMeetingRoom));
    }

    public Optional<OneMeetingRoom> findOneMeetRoom(Long roomId) {
        return Optional.ofNullable(roomId).flatMap(oneRepository::findById);
    }

    private Optional<GroupMeetingRoom> saveGroupMeetRoom(GroupMeetingRoom groupMeetingRoom) {
        return Optional.ofNullable(groupRepository.save(groupMeetingRoom));
    }

    public Optional<GroupMeetingRoom> findGroupMeetRoom(Long roomId) {
        return Optional.ofNullable(roomId).flatMap(groupRepository::findById);
    }

}
