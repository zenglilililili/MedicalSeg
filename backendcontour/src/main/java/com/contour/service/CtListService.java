package com.contour.service;

import com.contour.params.CtListRsp;
import com.contour.params.Patient;

public interface CtListService {
    CtListRsp ctList(Patient RegisterPara);
}
