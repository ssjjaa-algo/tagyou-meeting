package com.ssafy.project.service;

import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.dto.response.OneRoomRspDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.OneMeetingRoomRepository;
import com.ssafy.project.service.redis.RedisSubscriber;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoomService {

    private final OneMeetingRoomRepository oneMeetingRoomRepository;
    private final UserService userService;

    /**
     * 일대일 미팅방 개설 확인
     */
    public boolean enterMeetRoom(Long userId) {
        return oneMeetingRoomRepository.findByMaleUserId(userId).isPresent();
    }

    /**
     * 일대일 미팅방 개설
     */
    public OneRoomRspDto createMeetRoom(Long userId) {
        OneMeetingRoom newRoom = OneMeetingRoom.builder()
                .newUser(userService.findUser(userId)
                        .orElseThrow(() -> new NotFoundException("유저의 정보가 조회되지 않습니다.")))
                .build();
        oneMeetingRoomRepository.save(newRoom);
        return new OneRoomRspDto(newRoom);
    }

    /**
     * 일대일 미팅방 퇴장
     */

    /**
     * 그룹 미팅방 개설 확인
     */


}
