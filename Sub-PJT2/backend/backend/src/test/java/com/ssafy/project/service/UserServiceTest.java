package com.ssafy.project.service;

import com.ssafy.project.domain.user.User;
import com.ssafy.project.domain.user.UserGender;
import com.ssafy.project.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional

class UserServiceTest {
    @Autowired
    UserService userService;

    @Test
    public void 유저확인() throws Exception {
        //given
        User user = new User("m1","123","김싸피","011","hey", 12, UserGender.MALE);

        //when
        Long savedId = userService.join(user);

        //then
        assertEquals(user, userService.findOne(savedId));

    }

}