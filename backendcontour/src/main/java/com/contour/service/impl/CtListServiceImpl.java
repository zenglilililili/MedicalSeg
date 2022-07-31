package com.contour.service.impl;

import com.contour.params.Ct;
import com.contour.params.CtListRsp;
import com.contour.params.Patient;
import com.contour.params.Physists;
import com.contour.service.CtListService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class CtListServiceImpl implements CtListService {

    @Resource
    private JdbcTemplate jdbcTemplate;


    @Override
    public @ResponseBody
    CtListRsp ctList(Patient ctListReq) {
        CtListRsp ctListRsp = new CtListRsp();

        Integer patId = ctListReq.getPatId();

        if(patId == null){
            ctListRsp.setMsg("未传入病人ID");
            return ctListRsp;
        }

        String ctListSQL = "select * from patients_ct where patId=" + patId + ";";

        List<Ct> cts = jdbcTemplate.query(ctListSQL, new RowMapper<Ct>() {
            @Override
            public Ct mapRow(ResultSet rs, int rowNum) throws SQLException {
                Ct ct = new Ct();
                ct.setId(rs.getInt("id"));
                ct.setPatId(rs.getInt("patId"));
                ct.setName(rs.getString("name"));
                ct.setCtcounts(rs.getInt("ct_counts"));
                ct.setCtdelineate(rs.getString("ct_delineate"));
                ct.setDelineatemode(rs.getInt("delineate_mode"));
                ct.setDoccheck(rs.getBoolean("doc_check"));
                ct.setPeriod(rs.getInt("period"));
                ct.setCreatetime(rs.getTime("createtime"));
                return ct;
            }
        });
        ctListRsp.setMsg("成功");
        ctListRsp.setCt(cts);
        System.out.println(ctListRsp.getMsg());
        return ctListRsp;
    }
}
