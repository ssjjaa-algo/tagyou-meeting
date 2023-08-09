package com.ssafy.project.config;

import com.ssafy.project.dto.request.UserReqDto;
import com.ssafy.project.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectUrl;
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;
    private String state = "stateee";
    private String redirectUri = "localhost:3030/home";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println(">>> JwtAuthFilter");

        String token = ((HttpServletRequest)request).getHeader("Auth");
        System.out.println(">>> token: "+token);

        if (token != null && tokenService.verifyToken(token)) {
            Long uId = tokenService.parseUId(token);
            System.out.println(">>> after verifyToken");
            // DB연동을 안했으니 이메일 정보로 유저를 만들어주겠습니다
            UserReqDto userReqDto = new UserReqDto(uId, "email","이름");

            Authentication auth = getAuthentication(userReqDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        else if(token != null && token.equals("master")){
            Long uId = Long.parseLong(((HttpServletRequest) request).getHeader("userId"));
//            System.out.println(">>> master email: "+tmpEmail);

            UserReqDto userReqDto = new UserReqDto(uId, "email", "이름");
            Authentication auth = getAuthentication(userReqDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        else if(token != null && !tokenService.verifyToken(token)) {
            System.out.println(">>>>>>>>>>>>>>> token problem ");
            // 토큰 만료 or 잘못된 경우
//            HttpServletResponse res = (HttpServletResponse) response;
//            String oauthUrl = String.format(
//                    "%s?response_type=code&client_id=%s&state=%s&redirect_uri=%s",
//                    redirectUrl, clientId, state, redirectUri
//            );
//            res.sendRedirect(oauthUrl);
            return;
        }
        chain.doFilter(request, response);
    }

    public Authentication getAuthentication(UserReqDto member) {
        return new UsernamePasswordAuthenticationToken(member, "",
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
    }

}

