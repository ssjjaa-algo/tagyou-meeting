package com.ssafy.project.service;

import com.ssafy.project.domain.friend.FriendShip;
import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.notice.NoticeType;
import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.request.GroupReqDto;
import com.ssafy.project.dto.request.NoticeReqDto;
import com.ssafy.project.dto.response.GroupRspDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.GroupRepository;
import com.ssafy.project.repository.InvitationRepository;
import com.ssafy.project.repository.NoticeRepository;
import com.ssafy.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class GroupService {
    private final GroupRepository groupRepository;
    private final UserService userService;
    private final NoticeService noticeService;
    private final InvitationService invitationService;

    /**
     * 그룹 생성
     */
    public GroupRspDto createGroup(Long userId){
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹을 만들 유저가 존재하지 않습니다."));

        userService.checkUserGender(user);

        MeetingGroup meetingGroup = MeetingGroup.builder()
                .groupGender(user.getUserGender())
                .build();
        saveMeetingGroup(meetingGroup);
        user.setMeetingGroup(meetingGroup);
        log.info("createGroup : " + meetingGroup);
        return new GroupRspDto(meetingGroup);
    }

    /**
     * 그룹원 초대
     */
    public GroupRspDto inviteGroup(Long userId, GroupReqDto groupReqDto){
        // 동일한 유저인지 체크
        checkEqualUser(userId, groupReqDto.getTargetUserId());

        User targetUser = userService.findUser(groupReqDto.getTargetUserId())
                .orElseThrow(() -> new NotFoundException("그룹에 초대할 해당 유저가 존재하지 않습니다."));
        User sendUser = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹을 초대할 유저가 존재하지 않습니다."));

        return findMeetingGroup(groupReqDto.getGroupId())
                .filter(group -> group.getGroupGender().equals(targetUser.getUserGender()))
                .map(group -> {
                    // 초대 요청
                    invitationService.createInvitation(targetUser, group);

                    String requestContent = "미팅 그룹 요청 : "
                            + sendUser.getUserName()
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
    public GroupRspDto acceptGroup(Long userId, Long groupId){
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹에 수락할 유저가 존재하지 않습니다."));

        return findMeetingGroup(groupId)
                .map(group -> {
                    Optional.of(group).filter(g -> g.getGroupUser().size() < 3)
                            .orElseThrow(() ->new IllegalArgumentException("그룹원 최대 인원수에 초과되었습니다."));

                    invitationService.acceptInvitation(user, group);
                    user.setMeetingGroup(group);
                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다."));
    }

    /**
     * 그룹원 거절
     */
    public GroupRspDto rejectGroup(Long userId, Long groupId){
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹에 수락할 유저가 존재하지 않습니다."));

        return findMeetingGroup(groupId)
                .map(group -> {
                    Optional.of(group).filter(g -> g.getGroupUser().size() < 3)
                            .orElseThrow(() ->new IllegalArgumentException("그룹원 최대 인원수에 초과되었습니다."));

                    invitationService.rejectInvitation(user, group);
                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다."));
    }

    /**
     * 그룹 탈퇴
     */
    public GroupRspDto LeaveGroup(Long userId, Long groupId){
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹을 탈퇴할 유저가 존재하지 않습니다."));

        return findMeetingGroup(groupId)
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
    public GroupRspDto removeGroup(Long userId, Long groupId){

        return findMeetingGroup(groupId)
                .map(group -> {
                    Optional.of(group).filter(g -> g.getGroupUser().get(0).getId().equals(userId))
                            .orElseThrow(() -> new IllegalArgumentException("현재 그룹장이 아닙니다."));
                    group.deleteGroup();
                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다."));
    }
    private Optional<FriendShip> checkEqualUser(Long userId, Long targetId) {
        return Optional.ofNullable(userId)
                .filter(id -> id.equals(targetId))
                .map(n -> {
                    throw new IllegalStateException("자기 자신에게 그룹 초대 할 수 없습니다.");
                });
    }

    private MeetingGroup saveMeetingGroup(MeetingGroup meetingGroup){
        return groupRepository.save(meetingGroup);
    }

    public Optional<MeetingGroup> findMeetingGroup(Long groupId){
        return Optional.ofNullable(groupId).flatMap(groupRepository::findById);
    }

}

