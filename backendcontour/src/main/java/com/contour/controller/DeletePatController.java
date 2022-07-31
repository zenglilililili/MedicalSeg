package com.contour.controller;

import com.contour.params.DeletePatReq;
import com.contour.params.DeletePatRsp;
import com.contour.service.DeletePatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/deletePat")
public class DeletePatController {
    @Autowired
    private DeletePatService deletePatService;

    @PostMapping
    public @ResponseBody
    DeletePatRsp deletePat(@RequestBody DeletePatReq deletePatReq) {
        System.out.println("\n删除病人请求："+deletePatReq);

        return deletePatService.deletePat(deletePatReq);
    }
}
