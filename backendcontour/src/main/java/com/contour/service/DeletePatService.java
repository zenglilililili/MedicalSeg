package com.contour.service;

import com.contour.params.DeletePatReq;
import com.contour.params.DeletePatRsp;


public interface DeletePatService {
    DeletePatRsp deletePat(DeletePatReq deletePatPara);
}
