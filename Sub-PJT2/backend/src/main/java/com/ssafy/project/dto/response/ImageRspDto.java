package com.ssafy.project.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ImageRspDto {
    private String imageUrl;

    public ImageRspDto(String url){
        this.imageUrl = url;
    }
}
