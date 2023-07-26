package com.ssafy.project.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("member")
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        System.out.println("hello");
        return "hi";
    }
}
