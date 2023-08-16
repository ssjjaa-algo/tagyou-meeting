package com.ssafy.project.repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.group.QMeetingGroup;
import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.room.QGroupMeetingRoom;
import com.ssafy.project.domain.user.QUser;
import lombok.extern.slf4j.Slf4j;

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



        Optional<GroupMeetingRoom> groupMeetingRoom = Optional.ofNullable(
                queryFactory.selectFrom(qGroupRoom)
                        .where(qGroupRoom.id.in(
                                JPAExpressions.select(qUser.meetingRoom.id)
                                        .from(qUser)
                                        .where(qUser.userGender.ne(group.getGroupGender()),
                                                qUser.meetingRoom.id.in(
                                                        JPAExpressions.select(qUser.meetingRoom.id)
                                                                .from(qUser)
                                                                .groupBy(qUser.meetingRoom.id)
                                                                .having(qUser.meetingRoom.id.count().eq(1L))
                                                ))
                        ))
                        .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                        .fetchFirst());
        log.info("groupMeetingRoom " + groupMeetingRoom);
        return groupMeetingRoom;
    }
}
