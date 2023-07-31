package com.ssafy.project.attribute;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.project.dto.Token;
import com.ssafy.project.dto.UserDto;
import com.ssafy.project.service.TokenService;
import com.ssafy.project.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenService tokenService;
    private final UserRequestMapper userRequestMapper;
    private final ObjectMapper objectMapper;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        System.out.println(">>> onAuthenticationSuccess!");
        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        UserDto userDto = userRequestMapper.toDto(oAuth2User);

        log.info("Principal에서 꺼낸 OAuth2User = {}", oAuth2User);
        // 최초 로그인이라면 회원가입 처리를 한다.
        userService.saveUser(userDto);

        String targetUrl;
        log.info(">>> generate token");

        Token token = tokenService.generateToken(userDto.getEmail(), "USER");
        log.info(">>> generated token : {}", token);

        targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/auth")
                .queryParam("Auth", token.getToken())
                .build().toUriString();
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
        System.out.println(">>> SuccessHandler done!");
    }
}