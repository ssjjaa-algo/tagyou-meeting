package com.ssafy.project.service;

import com.ssafy.project.dto.Token;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Date;

@Service
public class TokenService{
    private String issuer = "issuer";
    private String secretKey = "token-secret-key-token-secret-key";
    private String tmpToken;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }


    public Token generateToken(String email, String role) {
        System.out.println(">>> generateToken / email: "+email+", role: "+role);
        long tokenPeriod = 1000L * 60L * 10L;
        long refreshPeriod = 1000L * 60L * 60L * 24L * 30L * 3L;

        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role);

        Date now = new Date();
        Token t = new Token(
                Jwts.builder()
                        .setClaims(claims)
                        .setIssuedAt(now)
                        .setExpiration(new Date(now.getTime() + tokenPeriod))
                        .signWith(SignatureAlgorithm.HS256, secretKey)
                        .compact(),
                Jwts.builder()
                        .setClaims(claims)
                        .setIssuedAt(now)
                        .setExpiration(new Date(now.getTime() + refreshPeriod))
                        .signWith(SignatureAlgorithm.HS256, secretKey)
                        .compact());
        tmpToken = t.getToken();
        System.out.println("!!!!!----->>> token: "+tmpToken);
        return t;

//        Claims claims = Jwts.claims().setSubject(email);
//        claims.put("role", role);
//        return new Token(
//                "accesstoken",
//                "refreshToken");
    }


    public boolean verifyToken(String token) {
//        token = tmpToken; //// 나중에 지워야 함!!!!
//        System.out.println(">>> secretKey: " + secretKey);
//        System.out.println("!!!!!----->>> token: "+token);
        System.out.print(">>> verifyToken -> ");
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            System.out.println("verify succeeded!!");
            return claims.getBody()
                    .getExpiration()
                    .after(new Date());
        } catch (Exception e) {
//            e.printStackTrace();
            System.out.println("failed verification..");
            return false;
        }
    }

    public String getUid(String token) {
//        System.out.println(">>> getUid");
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }
}