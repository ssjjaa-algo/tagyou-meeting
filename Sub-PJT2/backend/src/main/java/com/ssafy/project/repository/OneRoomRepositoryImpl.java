package com.ssafy.project.repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.room.QOneMeetingRoom;
import com.ssafy.project.domain.user.QUser;
import com.ssafy.project.domain.user.User;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
public class OneRoomRepositoryImpl implements OneRoomRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public OneRoomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Optional<OneMeetingRoom> findRamdomOneRoom(User user) {
        QOneMeetingRoom qOneRoom = QOneMeetingRoom.oneMeetingRoom;
        QUser qUser = QUser.user;

        Optional<OneMeetingRoom> oneMeetingRoom = Optional.ofNullable(
                queryFactory.selectFrom(qOneRoom)
                        .where(qOneRoom.id.in(
                                JPAExpressions.select(qUser.meetingRoom.id)
                                        .from(qUser)
                                        .where(qUser.userGender.ne(user.getUserGender()),
                                                qUser.meetingRoom.id.in(
                                                        JPAExpressions.select(qUser.meetingRoom.id)
                                                                .from(qUser)
                                                                .groupBy(qUser.meetingRoom.id)
                                                                .having(qUser.meetingRoom.id.count().eq(1L))
                                                ))
                        ))
                        .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                        .fetchFirst());

        log.info("oneMeetingRoom " + oneMeetingRoom);
        return oneMeetingRoom;
    }
}
