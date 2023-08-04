package com.ssafy.project.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.util.IOUtils;
import com.ssafy.project.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ImageService {

    private final AmazonS3Client amazonS3Client;
    private final ImageRepository imageRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public Long saveImageInDb() {


        return null;
    }

    @Transactional
    public String saveImageInS3(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String fileUrl = "https://" + bucket + ".s3.ap-northeast-2.amazonaws.com/" +fileName+"jpg";
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);
        return fileUrl;
    }

    public MultipartFile downloadImageAndConvertToMultipartFile(String imageUrl, Long pId) throws IOException {
        // 이미지 다운로드
        byte[] imageBytes = downloadImage(imageUrl);

        // 다운로드한 이미지를 MultipartFile로 변환
        MultipartFile multipartFile = new ByteArrayMultipartFile(imageBytes, pId+".jpg");

        return multipartFile;
    }

    public static byte[] downloadImage(String imageUrl) throws IOException {
        URL url = new URL(imageUrl); // 올바른 URL 클래스 사용
        try (InputStream inputStream = url.openStream()) {
            return IOUtils.toByteArray(inputStream);
        }
    }

    private static class ByteArrayMultipartFile implements MultipartFile {
        private final byte[] bytes;
        private final String name;
        private final String originalFilename;

        public ByteArrayMultipartFile(byte[] bytes, String originalFilename) {
            this.bytes = bytes;
            this.name = originalFilename;
            this.originalFilename = originalFilename;
        }

        @Override
        public String getName() {
            return name;
        }

        @Override
        public String getOriginalFilename() {
            return originalFilename;
        }

        @Override
        public String getContentType() {
            return "image/jpeg"; // or appropriate content type for your image
        }

        @Override
        public boolean isEmpty() {
            return bytes == null || bytes.length == 0;
        }

        @Override
        public long getSize() {
            return bytes.length;
        }

        @Override
        public byte[] getBytes() throws IOException {
            return bytes;
        }

        @Override
        public InputStream getInputStream() throws IOException {
            return new ByteArrayInputStream(bytes);
        }

        @Override
        public void transferTo(File dest) throws IOException, IllegalStateException {

        }

    }
}

