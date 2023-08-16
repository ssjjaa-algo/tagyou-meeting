package com.ssafy.project.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.group.QMeetingGroup;
import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.room.QGroupMeetingRoom;
import com.ssafy.project.domain.user.QUser;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
public class GroupRoomRepositoryImpl implements GroupRoomRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public GroupRoomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Optional<GroupMeetingRoom> findRandomGroupRoom(MeetingGroup group) {
        QGroupMeetingRoom qGroupRoom = QGroupMeetingRoom.groupMeetingRoom;
        QMeetingGroup qGroup = QMeetingGroup.meetingGroup;
        QUser qUser = QUser.user;

        // 같은 성별 그룹 유저 + 해당 그룹방 => 3 -> 2 -> 1이 되도록 찾는다
        // 3 - groupSize 하여 찾는다

        // 다른 성별의 경우에는 그냥 있다면 넣어줌

        // 만약 같은 성별, 다른 성별이 없는 그룹방이라면
        // Optional::empty를 반환

        int size = group.getGroupUser().size();
        List<Long> getIdealNumRoomIdList = null;
        boolean flag = false;

        for(int i = 3 - size; i >= 0; i--) {
            getIdealNumRoomIdList = queryFactory.select(qGroupRoom.id)
                    .from(qGroupRoom)
                    .join(qGroupRoom.userList, qUser)
                    .where(qUser.userGender.eq(group.getGroupGender()),
                            qGroupRoom.userList.size().eq(i))
                    .fetch();
            if(getIdealNumRoomIdList.size() > 0){
                flag = true;
                break;
            }
        }

        log.info("getIdealNumRoomIdList " + getIdealNumRoomIdList);

        if(!flag){
            getIdealNumRoomIdList = queryFactory.select(qGroupRoom.id)
                    .from(qGroupRoom)
                    .join(qGroupRoom.userList, qUser)
                    .where(qUser.userGender.ne(group.getGroupGender()))
                    .fetch();
        }

        Optional<GroupMeetingRoom> groupMeetingRoom = Optional.ofNullable(
                queryFactory.selectFrom(qGroupRoom)
                        .where(qGroupRoom.id.in(getIdealNumRoomIdList))
                        .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                        .fetchFirst());

        log.info("groupMeetingRoom " + groupMeetingRoom);
        return groupMeetingRoom;
    }
}
