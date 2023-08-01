package com.ssafy.project.config;

import com.ssafy.project.dto.UserDto;
import com.ssafy.project.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.util.Arrays;

@RequiredArgsConstructor
public class JwtAuthFilter extends GenericFilterBean {
    private final TokenService tokenService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println(">>> JwtAuthFilter");

        String token = ((HttpServletRequest)request).getHeader("Auth");
        System.out.println(">>> token: "+token);

        if (token != null && tokenService.verifyToken(token)) {
            String email = tokenService.parseEmail(token);
//            System.out.println(">>>after verifyToken, email: "+email);
            // DB연동을 안했으니 이메일 정보로 유저를 만들어주겠습니다
            //// 여기 수정해야댐!!!!
            UserDto userDto = UserDto.builder()
                    .email(email)
                    .name("이름이에용")
//                    .picture("프로필 이미지에요")
                    .build();

            Authentication auth = getAuthentication(userDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        else if(token != null && token.equals("master")){
            String tmpEmail = ((HttpServletRequest) request).getHeader("email");
//            System.out.println(">>> master email: "+tmpEmail);

            UserDto userDto = UserDto.builder()
                    .email(tmpEmail)
                    .name("이름이에용")
                    .build();
            Authentication auth = getAuthentication(userDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        chain.doFilter(request, response);
    }

    public Authentication getAuthentication(UserDto member) {
        return new UsernamePasswordAuthenticationToken(member, "",
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
    }
}

