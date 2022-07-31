package com.contour.service.impl;

import com.contour.params.Ct;
import com.contour.params.Slice;
import com.contour.params.SliceListRsp;
import com.contour.params.Patient;
import com.contour.service.SliceListService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class SliceListServiceImpl implements SliceListService {

    @Resource
    private JdbcTemplate jdbcTemplate;


    @Override
    public @ResponseBody
    SliceListRsp sliceList(Ct sliceListReq) {
        System.out.println("正在处理。。。");
//        String test = String.format("%08d",12);
//        System.out.println(test);
        SliceListRsp sliceListRsp = new SliceListRsp();

        Integer patId = sliceListReq.getPatId();
        Integer ctId = sliceListReq.getId();
//        System.out.println("patId=" + patId);
        if (patId == null || ctId == null) {
            sliceListRsp.setMsg("未传入CT ID");
            return sliceListRsp;
        }
//
        String sliceListSQL = "select * from patients_slice where patId=" + patId + " and ctId=" + ctId + ";";
//        System.out.println(sliceListSQL);
        List<Slice> slices = jdbcTemplate.query(sliceListSQL, new RowMapper<Slice>() {
            @Override
            public Slice mapRow(ResultSet rs, int rowNum) throws SQLException {
                Slice slice = new Slice();
                slice.setSliceId(rs.getInt("sliceId"));
                slice.setPatId(rs.getInt("patId"));
                slice.setPatPath(String.format("%010d",rs.getInt("patId")));
                slice.setCtId(rs.getInt("ctId"));
                slice.setDelineatemode(rs.getInt("delineate_mode"));
                slice.setCreatetime(rs.getTime("createtime"));
                return slice;
            }
        });
//        System.out.println(slices.size());
//        System.out.println(slices.get(0).toString());
        sliceListRsp.setMsg("成功");
        sliceListRsp.setSliceInfo(slices);
        System.out.println(sliceListRsp.getMsg());

        return sliceListRsp;
    }
}
