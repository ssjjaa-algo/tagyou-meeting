package com.ssafy.project.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.room.QOneMeetingRoom;
import com.ssafy.project.domain.user.QUser;
import com.ssafy.project.domain.user.User;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@Slf4j
public class OneRoomRepositoryImpl implements OneRoomRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public OneRoomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Optional<OneMeetingRoom> findRamdomRoom(User user) {
        QOneMeetingRoom qRoom = QOneMeetingRoom.oneMeetingRoom;
        QUser qUser = QUser.user;

        BooleanBuilder subqueryCondition = new BooleanBuilder()
                .and(qUser.meetingRoom.isNotNull())
                .and(qUser.userGender.ne(user.getUserGender()));

        Long otherUserRoomId = queryFactory
                .select(qUser.meetingRoom.id)
                .from(qUser)
                .where(subqueryCondition)
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .fetchFirst();

        if(otherUserRoomId != null) {
            Optional<OneMeetingRoom> oneMeetingRoom = Optional.ofNullable(queryFactory
                    .selectFrom(qRoom)
                    .where(qRoom.id.eq(otherUserRoomId))
                    .fetchFirst());
            log.info("oneMeetingRoom " + oneMeetingRoom);
            return oneMeetingRoom;
        }

        return Optional.empty();
    }
}
