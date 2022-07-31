package com.contour.params;

import lombok.Data;

@Data
public class LoginReq {
    private String name;
    private String password;
//    curl  -X POST "http://localhost:8080/login"  -H "Content-Type: application/json" -d "{"""name""":"""zenwgli""","""password""":"""123"""}"

}
