package com.ssafy.project.service;

import com.ssafy.project.domain.user.Profile;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.request.ProfileReqDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.ProfileRepository;
import com.ssafy.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public Profile getProfile(Long userId) {
        return profileRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException("해당 유저아이디의 프로필이 존재하지 않습니다. "));
    }

    @Transactional
    public Profile makeProfile(Long userId, ProfileReqDto profileReqDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("not found"));
//        Profile p = profileRepository.findByUserId(userId).orElseThrow();

//        if(p != null) { // 이미 존재하는 경우
//            new IllegalAccessException("이미 해당 유저아이디의 프로필이 존재합니다. ");
//            return null; ///// 이거 나중에 고쳐야댐!
//        }
        return profileRepository.save(Profile.builder()
                        .user(user)
                        .userSido(profileReqDto.getUserSido())
                        .userGugun(profileReqDto.getUserGugun())
                        .userJob(profileReqDto.getUserJob())
                        .userHobby(profileReqDto.getUserHobby())
                        .userMbti(profileReqDto.getUserMbti())
                        .content(profileReqDto.getContent())
                        .build());
    }

    @Transactional
    public Profile editProfile(Long userId, ProfileReqDto profileReqDto) {
        Profile p = profileRepository.findByUserId(userId).orElse(null);
        if(p == null) return null;
        p.updateProfile(profileReqDto);
        return p;
//        return profileRepository.findByUserId(userId)
//                .ifPresent(p -> p.updateProfile(profileReqDto))
//                .orElseThrow(()->new NotFoundException("해당 유저아이디의 프로필이 존재하지 않습니다. "));
    }

    /**
     * 프로필 등록
     */

    /**
     * 프로필 수정
     */

    /**
     * 프로필 삭제
     */
}
