package com.ssafy.project.repository;

import com.ssafy.project.domain.friend.FriendShip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendShipRepository extends JpaRepository<FriendShip, Long> {
}
