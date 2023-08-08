package com.ssafy.project.service;

import com.ssafy.project.domain.user.Image;
import com.ssafy.project.domain.user.Profile;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.request.ProfileReqDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserService userService;
    private final ImageService imageService;

    public Profile getProfileByUId(Long userId) {
        return profileRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException("해당 유저아이디의 프로필이 존재하지 않습니다. "));
    }

    public Profile getProfile(Long profileId) {
        return profileRepository.findById(profileId)
                .orElseThrow(()->new NotFoundException("해당 아이디의 프로필이 존재하지 않습니다. "));
    }

    @Transactional
    public Profile makeProfile(Long userId, ProfileReqDto profileReqDto) {
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("not found"));
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

    @Transactional
    public String saveProfileImage(Long uId, MultipartFile file) throws IOException {
        // 프로필사진 image 테이블에 저장
        Image img = imageService.initImageInDb(uId);

        // 사진 s3에 저장
        imageService.saveImageInS3(file, img.getId()+".jpg");

        Profile p = getProfileByUId(uId);
        img = imageService.editImageInDb(p, img, img.getId().toString(), file);

        return img.getFilePath();
    }

    public List<String> getProfileImages(Long id) {
        Profile p = getProfileByUId(id);
        return imageService.getProfileImages(p);
    }

    @Transactional(readOnly = false)
    public void deleteProfileImage(Long uId, Long imgId) throws IllegalAccessException {
        // 이미지 아이디로 이미지 찾기
        Image i = imageService.findImage(imgId)
                .orElseThrow(() -> new NotFoundException("해당 아이디의 이미지 없음"));
        // 유저 아이디로 프로필 찾기
        Profile p = getProfileByUId(uId);

        if(p.getUser().getId() != i.getProfile().getUser().getId())
            throw new IllegalAccessException("해당 이미지에 대한 접근 권한이 없습니다. ");

        imageService.deleteImage(imgId);
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
