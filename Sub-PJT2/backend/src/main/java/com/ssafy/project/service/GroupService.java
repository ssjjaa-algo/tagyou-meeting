package com.ssafy.project.service;

import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.request.GroupReqDto;
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
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("그룹을 만들 유저가 존재하지 않습니다."));

        MeetingGroup meetingGroup = saveMeetingGroup(
                MeetingGroup.builder()
                .user(user)
                .build());
        return new GroupRspDto(meetingGroup);
    }

    /**
     * 그룹원 초대
     */
    public GroupRspDto inviteGroup(GroupReqDto groupReqDto){
        User user = userRepository.findById(groupReqDto.getUserId())
                .orElseThrow(() -> new NotFoundException("그룹을 초대할 유저가 존재하지 않습니다."));

       return findMeetingGroup(groupReqDto.getGroupId())
                .map(group -> {
                    group.InviteGroup(user);
                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다."));
    }

    /**
     * 그룹 탈퇴
     */
    public GroupRspDto LeaveGroup(GroupReqDto groupReqDto){
        User user = userRepository.findById(groupReqDto.getUserId())
                .orElseThrow(() -> new NotFoundException("그룹을 탈퇴할 유저가 존재하지 않습니다."));

        return findMeetingGroup(groupReqDto.getGroupId())
                .map(group -> {
                    group.quitGroup(user);
                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다."));
    }

    /**
     * 그룹 삭제
     */
    public GroupRspDto removeGroup(GroupReqDto groupReqDto){
        return findMeetingGroup(groupReqDto.getGroupId())
                .map(group -> {
                    groupRepository.delete(group);
                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다."));
    }

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

