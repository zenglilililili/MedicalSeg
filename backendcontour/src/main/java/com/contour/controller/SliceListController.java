package com.contour.controller;

import com.contour.params.Ct;
import com.contour.params.SliceListRsp;
import com.contour.service.SliceListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/sliceListBack")
public class SliceListController {
    @Autowired
    private SliceListService sliceListService;

    @PostMapping
    public @ResponseBody
    SliceListRsp sliceList(@RequestBody Ct sliceListReq) {
        System.out.println("\n切片列表展示请求："+sliceListReq.toString());
        return sliceListService.sliceList(sliceListReq);
    }
}
