package com.ssafy.project.controller;
import java.util.Map;

//import javax.annotation.PostConstruct;

import com.ssafy.project.service.WebRtcService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@RestController
@RequiredArgsConstructor
public class WebRtcController {

//    @Value("${OPENVIDU_URL}")
//    private String OPENVIDU_URL;
//
//    @Value("${OPENVIDU_SECRET}")
//    private String OPENVIDU_SECRET;
//
//    private OpenVidu openvidu;
//
//    @PostConstruct
//    public void init() {
//        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
//    }
//
//    /**
//     * @param params The Session properties
//     * @return The Session ID
//     */
//    @PostMapping("/api/sessions")
//    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
//            throws OpenViduJavaClientException, OpenViduHttpException {
//        SessionProperties properties = SessionProperties.fromJson(params).build();
//        Session session = openvidu.createSession(properties);
//        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
//    }
//
//    /**
//     * @param sessionId The Session in which to create the Connection
//     * @param params    The Connection properties
//     * @return The Token associated to the Connection
//     */
//    @PostMapping("/api/sessions/{sessionId}/connections")
//    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
//                                                   @RequestBody(required = false) Map<String, Object> params)
//            throws OpenViduJavaClientException, OpenViduHttpException {
//        Session session = openvidu.getActiveSession(sessionId);
//        if (session == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
//        Connection connection = session.createConnection(properties);
//        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
//    }

    private final WebRtcService webRtcService;

    @GetMapping("/session")
    public String createSession() throws OpenViduJavaClientException, OpenViduHttpException {
        return webRtcService.initializeSession();
    }

    @GetMapping("/token/{sessionId}")
    public String getToken(@PathVariable String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        return webRtcService.createConnection(sessionId);
    }

}
