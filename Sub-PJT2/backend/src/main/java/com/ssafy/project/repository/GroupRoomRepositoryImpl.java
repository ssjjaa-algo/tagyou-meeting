package com.ssafy.project.repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.room.QGroupMeetingRoom;
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

//        if (group.getGroupGender() == Gender.MALE) {
//            return Optional.ofNullable(queryFactory.selectFrom(qRoom)
//                    .where(qRoom.maleCount, qRoom.femaleUser.isNotNull())
//                    .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
//                    .fetchFirst());
//        }
//        if (group.getGroupGender() == Gender.FEMALE) {
//            return Optional.ofNullable(queryFactory.selectFrom(qRoom)
//                    .where(qRoom.femaleUser.id.isNull(), qRoom.maleUser.id.isNotNull())
//                    .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
//                    .fetchFirst());
//        }

        return Optional.empty();
    }
}
