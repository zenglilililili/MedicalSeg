package com.contour.service;

import com.contour.params.PatListRsp;
import com.contour.params.Physists;

public interface PatListService {
    PatListRsp patList(Physists RegisterPara);
}
