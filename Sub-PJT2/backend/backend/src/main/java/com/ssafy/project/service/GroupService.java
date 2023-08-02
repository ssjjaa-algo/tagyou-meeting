package com.ssafy.project.service;

import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.response.GroupRspDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.GroupRepository;
import com.ssafy.project.repository.NoticeRepository;
import com.ssafy.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class GroupService {
    private final GroupRepository groupRepository;
    private final NoticeRepository noticeRepository;
    private final NoticeService noticeService;
    private final UserRepository userRepository;

    /**
     * 그룹 생성
     */
    public GroupRspDto createGroup(Long userId){
        User hostUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("그룹을 만들 유저가 현재 존재하지 않습니다."));

        MeetingGroup meetingGroup = saveMeetingGroup(MeetingGroup.builder()
                .user(hostUser)
                .build());
        return new GroupRspDto(meetingGroup);
    }


    /**
     * 그룹원 초대
     */

    /**
     * 그룹원 추방
     */

    /**
     * 그룹원 탈퇴
     */

    /**
     * 그룹 삭제
     */

    /**
     * 그룹원 목록 조회
     */

    private MeetingGroup saveMeetingGroup(MeetingGroup meetingGroup){
        return groupRepository.save(meetingGroup);
    }

    private Optional<MeetingGroup> findMeetingGroup(Long groupId){
        return Optional.ofNullable(groupId).flatMap(groupRepository::findById);
    }

}

