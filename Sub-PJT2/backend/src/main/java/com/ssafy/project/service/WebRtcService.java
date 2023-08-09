package com.ssafy.project.service;

import com.ssafy.project.exception.NotFoundException;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public class WebRtcService {

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public String initializeSession(Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        return session.getSessionId();
    }

    public String createConnection(String sessionId, Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            throw new NotFoundException("해당 아이디에 해당에 세션이 없습니다. ");
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        // 들어오는 사람의 권한이 publisher. role()을 어디서 만지지??
        // params를 여기서 생성하면 되지 않을까?
        Connection connection = session.createConnection(properties);
        return connection.getToken();
    }

}
