package com.contour.service;

import com.contour.params.Contour;
import com.contour.params.DelineateRsp;

public interface DelineateService {
    DelineateRsp delineate(Contour delineateListReq);
}
