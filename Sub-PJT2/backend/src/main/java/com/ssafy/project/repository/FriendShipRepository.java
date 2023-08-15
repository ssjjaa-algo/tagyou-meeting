package com.ssafy.project.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.project.domain.friend.FriendShip;
import com.ssafy.project.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendShipRepository extends JpaRepository<FriendShip, Long> {
    Optional<FriendShip> findByUserIdAndTargetUserId(Long userId, Long targetId);
    Optional<List<FriendShip>> findAllByUserId(Long userId);

    void deleteByUserIdAndTargetUserId(Long userId, Long targetId);

}
