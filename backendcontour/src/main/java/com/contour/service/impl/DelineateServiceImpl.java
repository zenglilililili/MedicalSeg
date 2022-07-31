package com.contour.service.impl;

import com.contour.params.Contour;
import com.contour.params.Ct;
import com.contour.params.DelineateRsp;
import com.contour.service.DelineateService;
import com.mysql.cj.xdevapi.JsonParser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class DelineateServiceImpl implements DelineateService {

    @Resource
    private JdbcTemplate jdbcTemplate;


    @Override
    public @ResponseBody
    DelineateRsp delineate(Contour delineateReq) {
        System.out.println("正在处理ROI...");
        //构建返回值
        DelineateRsp delineateRsp = new DelineateRsp();
        Integer patId = delineateReq.getPatId();
        Integer ctId = delineateReq.getCtId();
        Integer sliceId = delineateReq.getSliceId();
        if (patId == null || ctId == null || sliceId == null) {
            System.out.println(patId + "  " + ctId + "  " + sliceId);
            delineateRsp.setMsg("切片路径无效");
            return delineateRsp;
        }


        // 查询该切片有几种勾画结果

        String delineateSQL = "select * from contour where patId=" + patId + " and ctId=" + ctId + " and sliceId=" + sliceId + ";";
        List<Contour> contours = jdbcTemplate.query(delineateSQL, new RowMapper<Contour>() {
            @Override
            public Contour mapRow(ResultSet rs, int rowNum) throws SQLException {

                Contour contour = new Contour();
                contour.setContourId(rs.getInt("contourId"));
                contour.setPatId(rs.getInt("patId"));
                contour.setPatPath(String.format("%010d", rs.getInt("patId")));
                contour.setCtId(rs.getInt("ctId"));
                contour.setSliceId(rs.getInt("sliceId"));
                contour.setModelId(rs.getInt("modelId"));
                contour.setConStr(rs.getString("contour"));
                return contour;
            }
        });
        //查询每种勾画结果对应的contour
        for (int i = 0; i < contours.size(); i++) {
            Contour con = contours.get(i);
            Integer modelId = con.getModelId();
            String modelSQL = "select * from model where modelId=" + modelId + ";";
            List<Contour> con_models = jdbcTemplate.query(modelSQL, new RowMapper<Contour>() {
                @Override
                public Contour mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Contour con_model = new Contour();
                    con_model.setModelId(rs.getInt("modelId"));
                    con_model.setModelName(rs.getString("modelName"));
                    con_model.setColor(rs.getString("color"));
                    return con_model;
                }
            });

            if (con_models.size() == 0) {
                delineateRsp.setMsg("没有当前查询的模型");
            }
            String tmpStr = con.getConStr().replace(" ", "");
            if (tmpStr.substring(0, 2).equals("[[")) {
                tmpStr = tmpStr.substring(2, tmpStr.length());
            }
            if (tmpStr.substring(tmpStr.length() - 2, tmpStr.length()).equals("]]")) {
                tmpStr = tmpStr.substring(0, tmpStr.length() - 2);
            }
            String[] posStr = tmpStr.split("],\\[");
            List<List<Integer>> posArr = new ArrayList<>(posStr.length);
            for (int n = 0; n < posStr.length; n++) {
                List<Integer> tmpArr = new ArrayList<>(2);
                tmpArr.add(Integer.valueOf(posStr[n].split(",")[0]));
                tmpArr.add(Integer.valueOf(posStr[n].split(",")[1]));
                posArr.add(tmpArr);
            }
            con.setModelName(con_models.get(0).getModelName());
            con.setColor(con_models.get(0).getColor());
            con.setContour(posArr);
            contours.set(i, con);
        }

        //切片张数
        String ctListSQL = "select ct_counts from patients_ct where patId=" + patId + " and id="+ctId+";";

        List<Ct> cts = jdbcTemplate.query(ctListSQL, new RowMapper<Ct>() {
            @Override
            public Ct mapRow(ResultSet rs, int rowNum) throws SQLException {
                Ct ct = new Ct();
                ct.setCtcounts(rs.getInt("ct_counts"));
                return ct;
            }
        });

        //返回值
        delineateRsp.setMsg("成功");
        delineateRsp.setContourInfo(contours);
        delineateRsp.setMaxPage(cts.get(0).getCtcounts());

        return delineateRsp;
    }
}
