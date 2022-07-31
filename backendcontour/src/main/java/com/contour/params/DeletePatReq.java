package com.contour.params;

import lombok.Data;

@Data
public class DeletePatReq {
    private Integer patId;
    private Integer docId;
//    curl  -X POST "http://localhost:8080/login"  -H "Content-Type: application/json" -d "{"""name""":"""zenwgli""","""password""":"""123"""}"

}
