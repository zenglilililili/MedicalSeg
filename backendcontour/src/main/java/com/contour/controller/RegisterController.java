package com.contour.controller;

import com.contour.service.RegisterService;
import com.contour.params.Physists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/registerBack")
public class RegisterController {
    @Autowired
    private RegisterService registerService;

    @PostMapping
    public Boolean register(@RequestBody Physists registerReq) {
        System.out.println("注册请求接收成功：");
        System.out.println(registerReq);
        return registerService.register(registerReq);
    }
}
