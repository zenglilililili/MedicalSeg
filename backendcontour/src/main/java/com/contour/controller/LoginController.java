package com.contour.controller;

import com.contour.params.LoginReq;
import com.contour.params.LoginRsp;
import com.contour.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/logBack")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping
    public @ResponseBody
    LoginRsp login(@RequestBody LoginReq loginReq) {
        System.out.println("成功");
        System.out.println(loginReq);

        return loginService.login(loginReq);
    }
}
