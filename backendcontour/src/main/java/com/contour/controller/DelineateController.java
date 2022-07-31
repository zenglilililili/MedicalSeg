package com.contour.controller;

import com.contour.params.Contour;
import com.contour.params.DelineateRsp;
import com.contour.service.DelineateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/delineateBack")
public class DelineateController {
    @Autowired
    private DelineateService delineateListService;

    @PostMapping
    public @ResponseBody
    DelineateRsp delineateList(@RequestBody Contour delineateListReq) {
        System.out.println("\n切片列表展示请求："+delineateListReq.toString());
        return delineateListService.delineate(delineateListReq);
    }
}
