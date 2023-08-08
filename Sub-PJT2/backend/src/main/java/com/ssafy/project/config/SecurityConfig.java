package com.ssafy.project.config;

import com.ssafy.project.attribute.OAuth2SuccessHandler;
import com.ssafy.project.service.CustomOAuth2UserService;
import com.ssafy.project.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@EnableWebSecurity ////
@Configuration
public class SecurityConfig {
    private final CustomOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler successHandler;
    private final TokenService tokenService;
    private final CorsConfig corsConfig; ////

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .requestMatchers("/api/token/**").permitAll()
                .requestMatchers("/api/login/oauth2/kakao").permitAll()
                .anyRequest().authenticated()
                .and()
                ////
                .addFilter(corsConfig.corsFilter())
                ////
                .addFilterBefore(new JwtAuthFilter(tokenService),
                        UsernamePasswordAuthenticationFilter.class)
                .oauth2Login().loginPage("http://localhost:3000/home") // loginPage("http://localhost:3000/auth")
                .successHandler(successHandler)
                .userInfoEndpoint().userService(oAuth2UserService);
        http.addFilterBefore(new JwtAuthFilter(tokenService), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}