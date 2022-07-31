package com.contour.params;

import java.util.List;
import com.contour.params.Slice;

public class SliceListRsp {
    String msg;
    List<Slice> sliceInfo;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public List<Slice> getSliceInfo() {
        return sliceInfo;
    }

    public void setSliceInfo(List<Slice> sliceInfo) {
        this.sliceInfo = sliceInfo;
    }
}
