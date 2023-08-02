package com.ssafy.project.service;

import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.UserDto;
import com.ssafy.project.dto.request.UserInfoReqDto;
import com.ssafy.project.dto.response.UserRspDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * 회원 가입
     */
    @Transactional
    public UserRspDto signUpUser(UserDto userDto) {
        findUserByEmail(
                userDto.getEmail()).ifPresent(
                        user -> { throw new IllegalStateException("이미 존재하는 회원입니다.");}
        );

        return saveUser(new User(userDto.getEmail(),userDto.getName()))
                .map(UserRspDto::new)
                .orElseThrow(() -> new NotFoundException("유효하지 않은 유저입니다."));
    }
    /**
     * 회원 정보 수정
     */
    @Transactional
    public UserRspDto editUserInfo(Long userId, UserInfoReqDto userInfo) {
        User user = findUser(userId).orElseThrow(() -> new NotFoundException("해당하는 유저가 없습니다."));
        user.changeUser(userInfo);
        return new UserRspDto(user);
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
            return false;

        return true;
    }

    public UserRspDto getUserInfo(Long userId) {
        return findUser(userId)
                .map(UserRspDto::new)
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

