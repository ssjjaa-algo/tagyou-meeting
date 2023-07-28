package com.ssafy.project.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FriendShipService {

    /**
     * 친구 요청
     */
    @Transactional
    public void addFriendShip(){

    }

    /**
     * 친구 수락
     */
    @Transactional
    public void acceptFriendShip(){

    }

    /**
     * 친구 거절
     */


}
