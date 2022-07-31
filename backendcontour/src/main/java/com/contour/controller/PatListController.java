package com.contour.controller;

import com.contour.params.PatListRsp;
import com.contour.params.Physists;
import com.contour.service.PatListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/patListBack")
public class PatListController {
    @Autowired
    private PatListService patListService;

    @PostMapping
    public @ResponseBody
    PatListRsp patList(@RequestBody Physists patListReq) {
        System.out.println("\n病例列表展示请求:" + patListReq);
        return patListService.patList(patListReq);
    }
}
