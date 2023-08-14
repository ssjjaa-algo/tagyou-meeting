package com.ssafy.project.repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.room.QOneMeetingRoom;
import com.ssafy.project.domain.user.QUser;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@Slf4j
public class OneRoomRepositoryImpl implements OneRoomRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public OneRoomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Optional<OneMeetingRoom> findRamdomRoom(Gender gender) {
        QOneMeetingRoom qRoom = QOneMeetingRoom.oneMeetingRoom;

        if (gender == Gender.MALE) {
            return Optional.ofNullable(queryFactory.selectFrom(qRoom)
                    .where(qRoom.maleUser.isNull(), qRoom.femaleUser.isNotNull())
                    .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                    .fetchFirst());
        }
        if (gender == Gender.FEMALE) {
            return Optional.ofNullable(queryFactory.selectFrom(qRoom)
                    .where(qRoom.femaleUser.id.isNull(), qRoom.maleUser.id.isNotNull())
                    .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                    .fetchFirst());
        }
        return Optional.empty();
    }
}
