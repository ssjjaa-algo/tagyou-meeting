package com.ssafy.project.service;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.OneMeetingRoomRepository;
import com.ssafy.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@Slf4j
@RequiredArgsConstructor
public class RoomService {
    private final UserRepository userRepository;

    private final OneMeetingRoomRepository oneMeetingRoomRepository;
    private final UserService userService;

    /**
     * 일대일 미팅방 입장
     */
    public boolean enterOneMeetRoom(Long userId) {
        userService.findUser(userId)
                .map(user -> user.getUserGender().equals(Gender.MALE)).ifPresent(isMale -> {
                    if(isMale) {
                        oneMeetingRoomRepository.findAll();
                    } else {
                        oneMeetingRoomRepository.findByMaleUserId(userId)
                                .orElse(createOneMeetRoom(userId));
                    }
                });

        return oneMeetingRoomRepository.findByMaleUserId(userId).isPresent();
    }

    /**
     * 일대일 미팅방 개설
     */
    public OneMeetingRoom createOneMeetRoom(Long userId) {
        log.info("createOneMeetRoom : " + userId);
        OneMeetingRoom newRoom = OneMeetingRoom.builder()
                .newUser(userService.findUser(userId)
                        .orElseThrow(() -> new NotFoundException("유저의 정보가 조회되지 않습니다.")))
                .build();
        return saveOneMeetRoom(newRoom);
    }

    /**
     * 일대일 미팅방 퇴장
     */

    /**
     * 그룹 미팅방 개설 확인
     */

    private OneMeetingRoom saveOneMeetRoom(OneMeetingRoom oneMeetingRoom) {
        return oneMeetingRoomRepository.save(oneMeetingRoom);
    }



}
