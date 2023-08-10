package com.ssafy.project.service;

import com.ssafy.project.repository.OneMeetingRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class BlindRoomService {
    private final OneMeetingRoomRepository oneMeetingRoomRepository;
    private final UserService userService;


}
