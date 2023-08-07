package com.ssafy.project.service;

import com.ssafy.project.repository.MeetingRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class BlindRoomService {
    private final MeetingRoomRepository meetingRoomRepository;
    private final UserService userService;


}
