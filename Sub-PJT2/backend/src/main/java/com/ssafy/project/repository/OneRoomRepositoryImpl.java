package com.ssafy.project.repository;

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
        QUser qUser = QUser.user;

//        BooleanExpression genderDependentExists = null;
//
//        if (gender == Gender.MALE) {
//            genderDependentExists = qUser.userGender.eq(Gender.FEMALE)
//                    .and(queryFactory.selectOne().from(qUser)
//                            .where(qUser.userGender.eq(Gender.MALE)
//                                    .and(qUser.meetingRoom.id.eq(qRoom.id)))
//                            .exists()); // 여기서 exists로 변경
//        }
//
//        if (gender == Gender.FEMALE) {
//            genderDependentExists = qUser.userGender.eq(Gender.MALE)
//                    .and(queryFactory.selectOne().from(qUser)
//                            .where(qUser.userGender.eq(Gender.FEMALE)
//                                    .and(qUser.meetingRoom.id.eq(qRoom.id)))
//                            .exists()); // 여기서 exists로 변경
//            log.info(genderDependentExists.toString());
//        }
//
//        if (genderDependentExists != null) {
//            return Optional.ofNullable(queryFactory.selectFrom(qRoom)
//                    .where(genderDependentExists)
//                    .orderBy(NumberExpression.random().asc())
//                    .fetchFirst());
//        } else {
//            return Optional.empty();
//        }
        if (gender == Gender.MALE) {
            return Optional.ofNullable(queryFactory.selectFrom(qRoom)
                    .where(qRoom.maleUser.id.isNull(), qRoom.femaleUser.id.eq(qUser.id))
                    .orderBy(NumberExpression.random().asc())
                    .fetchFirst());
        }
        if (gender == Gender.FEMALE) {
            return Optional.ofNullable(queryFactory.selectFrom(qRoom)
                    .where(qRoom.femaleUser.id.isNull(), qRoom.maleUser.id.eq(qUser.id))
                    .orderBy(NumberExpression.random().asc())
                    .fetchFirst());
        }
        return Optional.empty();
    }
}
