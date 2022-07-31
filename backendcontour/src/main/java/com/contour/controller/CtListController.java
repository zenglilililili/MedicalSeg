package com.contour.controller;

import com.contour.params.CtListRsp;
import com.contour.params.Patient;
import com.contour.service.CtListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/ctListBack")
public class CtListController {
    @Autowired
    private CtListService ctListService;

    @PostMapping
    public @ResponseBody
    CtListRsp ctList(@RequestBody Patient ctListReq) {
        System.out.println("\nct列表展示请求:"+ctListReq.toString());
        return ctListService.ctList(ctListReq);
    }
}
