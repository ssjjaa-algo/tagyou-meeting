package com.ssafy.project.service;

import com.ssafy.project.domain.user.Image;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.request.UserReqDto;
import com.ssafy.project.dto.request.UserInfoReqDto;
import com.ssafy.project.dto.response.FirstLoginRspDto;
import com.ssafy.project.dto.response.ImageRspDto;
import com.ssafy.project.dto.response.UserInfoRspDto;
import com.ssafy.project.dto.response.UserRspDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ImageService imageService;


    /**
     * 회원 가입
     */
    @Transactional
    public UserRspDto signUpUser(UserReqDto userReqDto) {
        findUserByEmail(
                userReqDto.getEmail()).ifPresent(
                        user -> { throw new IllegalStateException("이미 존재하는 회원입니다.");}
        );

        return saveUser(new User(userReqDto.getEmail(), userReqDto.getName()))
                .map(UserRspDto::new)
                .orElseThrow(() -> new NotFoundException("유효하지 않은 유저입니다."));
    }
    /**
     * 회원 정보 수정
     */
    @Transactional
    public UserInfoRspDto editUserInfo(Long userId, UserInfoReqDto userInfo) {
        User user = findUser(userId).orElseThrow(() -> new NotFoundException("해당하는 유저가 없습니다."));
        user.changeUser(userInfo);
        return new UserInfoRspDto(user);
    }

    public Long getUserIdByEmail(String email) {
        return findUserByEmail(email)
                .map(User::getId)
                .orElseThrow(() -> new NotFoundException("이메일에 해당하는 유저가 없습니다."));
    }

    public boolean hasDetailInfo(Long userId) {
        User u = findUser(userId)
                .orElseThrow(() -> new NotFoundException("해당하는 유저가 없습니다."));
        if(u.getPhoneNumber() == null)
            return true;

        return false;
    }

    public UserInfoRspDto getUserInfo(Long userId) {
        return findUser(userId)
                .map(UserInfoRspDto::new)
                .orElseThrow(() -> new NotFoundException("해당하는 유저가 없습니다."));
    }

    public boolean checkUserExists(String email){
        return findUserByEmail(email).isPresent();
    }

    public Optional<User> saveUser(User user){ return Optional.of(userRepository.save(user));}

    public Optional<User> findUser(Long userId){
        return userRepository.findById(userId);
    }

    public Optional<User> findUserByEmail(String email){
        return userRepository.findByUserEmail(email);
    }

    @Transactional
    public void saveUserAuthImage(UserReqDto userReqDto, String imgUrl) throws IOException {

        // uID 찾기 -> s3이미지 저장할때 이름으로 써야함
        User u = findUserByEmail(userReqDto.getEmail())
                .orElseThrow(() -> new NotFoundException("이메일에 해당하는 유저가 없습니다."));

        // 먼저 db에 임시 저장
        Image img = imageService.initImageInDb(u.getId());

        // 파일로 변환, 사진 s3에 저장 (이미지 아이디가 파일 이름임)
        MultipartFile f = imageService.downloadImageAndConvertToMultipartFile(imgUrl, img.getId().toString());
        imageService.saveImageInS3(f, f.getOriginalFilename());

        // 임시저장한 프사 정보 image 테이블 수정
        img = imageService.editImageInDb(img, f);

        // 프사 정보 user 정보에 저장
        u.changeUserImg(img);
    }

    @Transactional
    public ImageRspDto editUserImage(Long uId, MultipartFile file) throws IOException {

        // 먼저 db에 임시 저장
        Image img = imageService.initImageInDb(uId);

        imageService.saveImageInS3(file, img.getId()+".jpg");

        // 임시저장한 프사 정보 image 테이블 수정
        img = imageService.editImageInDb(img, file);

        // 프사 정보 user 정보에 저장
        User u = findUser(uId)
                .orElseThrow(() -> new NotFoundException("유저아이디에 해당하는 유저가 없습니다."));
        u.changeUserImg(img);

        return new ImageRspDto(img.getFilePath());
    }

    public ImageRspDto getUserImage(Long uId) {
        User u = findUser(uId)
                .orElseThrow(() -> new NotFoundException("유저아이디에 해당하는 유저가 없습니다."));
        Image img = imageService.findImage(u.getMainImage().getId())
                .orElseThrow(() -> new NotFoundException("이미지아이디에 해당하는 이미지가 없습니다."));

        return new ImageRspDto(img.getFilePath());
    }


//    /**
//     * 회원 가입
//     */
//    @Transactional
//    public Long join(User user) {
//
//        validateDuplicateUser(user); //중복 회원 검증
//        userRepository.save(user);
//        return user.getUserId();
//    }
//
//    private void validateDuplicateUser(User user) {
//        List<User> findUsers = userRepository.findByUserName(user.getUserName());
//        if (!findUsers.isEmpty()) {
//            throw new IllegalStateException("이미 존재하는 회원입니다.");
//        }
//    }
//
//    //회원 전체 조회
//    public List<User> findUsers() {
//        return userRepository.findAll();
//    }
//
//    public User findOne(Long userId) {
//        return userRepository.findById(userId).orElseThrow(()-> new NotFoundException("잘못된 접근입니다."));
//    }

}

