package com.contour.service;

import com.contour.params.LoginReq;
import com.contour.params.LoginRsp;


public interface LoginService {
    LoginRsp login(LoginReq loginPara);
}
