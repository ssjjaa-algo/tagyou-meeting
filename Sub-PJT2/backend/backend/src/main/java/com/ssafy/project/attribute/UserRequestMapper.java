package com.ssafy.project.attribute;

import com.ssafy.project.dto.UserDto;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Component
public class UserRequestMapper {
    public UserDto toDto(OAuth2User oAuth2User) {
        var attributes = oAuth2User.getAttributes();
        return new UserDto((String)attributes.get("email"),
                (String)attributes.get("name"));
//                .picture((String)attributes.get("picture"))
    }
}