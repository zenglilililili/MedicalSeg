package com.contour.service;

import com.contour.params.SliceListRsp;
import com.contour.params.Ct;

public interface SliceListService {
    SliceListRsp sliceList(Ct sliceListReq);
}
