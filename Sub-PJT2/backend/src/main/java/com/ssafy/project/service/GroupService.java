package com.ssafy.project.service;

import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.notice.NoticeType;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.request.GroupReqDto;
import com.ssafy.project.dto.request.NoticeReqDto;
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
    private final NoticeService noticeService;
    private final UserRepository userRepository;

    /**
     * 그룹 생성
     */
    public GroupRspDto createGroup(Long userId){
        User user = findUser(userId)
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
        User targetUser = findUser(groupReqDto.getTargetUserId())
                .orElseThrow(() -> new NotFoundException("그룹에 초대할 해당 유저가 존재하지 않습니다."));

        return findMeetingGroup(groupReqDto.getGroupId())
                .filter(group -> group.getGroupGender().equals(targetUser.getUserGender()))
                .map(group -> {
                    User sendUser = findUser(groupReqDto.getUserId())
                            .orElseThrow(() -> new NotFoundException("그룹을 초대할 유저가 존재하지 않습니다."));

                    String requestContent = "미팅 그룹 요청 : "
                            + targetUser.getUserName()
                            + "님이 보내온 그룹 요청입니다!!";

                    NoticeReqDto noticeReqDto = new NoticeReqDto(sendUser.getId(), NoticeType.GROUP_REQUEST,requestContent);
                    noticeService.insertNotice(noticeReqDto);

                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("초대할 유저의 성별과 해당 그룹의 성별이 일치 하지 않습니다."));
    }

    /**
     * 그룹원 수락
     */
    public GroupRspDto acceptGroup(GroupReqDto groupReqDto){
        User targetUser = findUser(groupReqDto.getTargetUserId())
                .orElseThrow(() -> new NotFoundException("그룹에 초대할 해당 유저가 존재하지 않습니다."));

        return findMeetingGroup(groupReqDto.getGroupId())
                .map(group -> {
                    Optional.of(group).filter(g -> g.getGroupUser().size()>=3)
                            .orElseThrow(() ->new IllegalArgumentException("그룹원 최대 인원수에 초과되었습니다."));
                    group.acceptGroup(targetUser);
                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다."));
    }

    /**
     * 그룹 탈퇴
     */
    public GroupRspDto LeaveGroup(Long groupId, Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("그룹을 탈퇴할 유저가 존재하지 않습니다."));

        return findMeetingGroup(groupId)
                .map(group -> {
                    Optional.of(group).filter(g -> g.getGroupUser().size() < 0)
                            .orElseThrow(() -> new IllegalArgumentException("그룹원의 인원수가 0명입니다."));
                    group.quitGroup(user);
                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다."));
    }

    /**
     * 그룹 삭제
     */
    public GroupRspDto removeGroup(Long groupId, Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("그룹을 삭제할 유저가 존재하지 않습니다."));


        return findMeetingGroup(groupId)
                .map(group -> {
                    Optional.of(group).filter(g -> g.getGroupUser().peek().getId() == userId)
                            .orElseThrow(() -> new IllegalArgumentException("현재 그룹장이 아닙니다."));
                    group.deleteGroup();
                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다."));
    }

    private MeetingGroup saveMeetingGroup(MeetingGroup meetingGroup){
        return groupRepository.save(meetingGroup);
    }

    private Optional<MeetingGroup> findMeetingGroup(Long groupId){
        return Optional.ofNullable(groupId).flatMap(groupRepository::findById);
    }

    private Optional<User> findUser(Long userId){
        return Optional.ofNullable(userId).flatMap(userRepository::findById);
    }

}

