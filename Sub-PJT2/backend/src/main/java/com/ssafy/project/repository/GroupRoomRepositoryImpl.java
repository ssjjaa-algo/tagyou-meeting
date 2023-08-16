package com.ssafy.project.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
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
    public Optional<GroupMeetingRoom> findRamdomRoom(MeetingGroup group) {
        QGroupMeetingRoom qRoom = QGroupMeetingRoom.groupMeetingRoom;
        QMeetingGroup qGroup = QMeetingGroup.meetingGroup;
        QUser qUser = QUser.user;

//        BooleanBuilder subqueryCondition = new BooleanBuilder()
//                .and(qUser.meetingGroup.isNotNull())
//                .and(qUser.userGender.ne(group.getGroupGender()));
//
//        Long otherUserRoomId = queryFactory
//                .select(qUser.meetingRoom.id)
//                .from(qUser)
//                .where(subqueryCondition)
//                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
//                .fetchFirst();
//
//        if(otherUserRoomId != null) {
//            log.info("otherUserRoomId " + otherUserRoomId);
//            Optional<OneMeetingRoom> oneMeetingRoom = Optional.ofNullable(queryFactory
//                    .selectFrom(qRoom)
//                    .where(qRoom.id.eq(otherUserRoomId))
//                    .fetchFirst());
//            log.info("oneMeetingRoom " + oneMeetingRoom);
//            return oneMeetingRoom;


        return Optional.empty();
    }
}
