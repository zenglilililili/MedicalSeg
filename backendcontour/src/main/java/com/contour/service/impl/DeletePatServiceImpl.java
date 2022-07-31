package com.contour.service.impl;

import com.contour.params.DeletePatReq;
import com.contour.params.DeletePatRsp;
import com.contour.params.Patient;
import com.contour.service.DeletePatService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class DeletePatServiceImpl implements DeletePatService {

    @Resource
    private JdbcTemplate jdbcTemplate;


    @Override
    public DeletePatRsp deletePat(DeletePatReq deletePatReq) {
        DeletePatRsp deletePatRsp = new DeletePatRsp();

        Integer patId = deletePatReq.getPatId();
        Integer docId = deletePatReq.getDocId();

        if (patId == null || docId == null) {
            deletePatRsp.setMsg("未选择正确医生");
            return deletePatRsp;
        }
        // 查询数据库
        String sql = "select * from patients_info where patId=" + patId;

        List<Patient> patients = jdbcTemplate.query(sql, new RowMapper<Patient>() {
            @Override
            public Patient mapRow(ResultSet rs, int rowNum) throws SQLException {
                Patient patient = new Patient();
                patient.setDelDocId(docId);
                patient.setId(rs.getInt("id"));
                patient.setName(rs.getString("name"));
                patient.setPatId(rs.getInt("patId"));
                patient.setDocName(rs.getString("doc_name"));
                patient.setPyhsistsName(rs.getString("pyhsists_name"));
                patient.setDepartment(rs.getString("department"));
                patient.setDetail(rs.getString("detail"));
                patient.setCtcount(rs.getInt("ct_count"));
                patient.setCreatetime(rs.getTime("createtime"));

                return patient;
            }
        });
        String delSQL = "DELETE FROM patients_info WHERE patId = ?";
        int i = jdbcTemplate.update(delSQL, patId);
        if (i == 0 || patients.size() == 0) {
            deletePatRsp.setMsg("无当前病人数据");
            return deletePatRsp;
        }

        for (int j = 0; j < patients.size(); j++) {
            String insertSQL = "insert into del_patients_info(`id`,`name`,`patId`,`delDocId`,`doc_name`,`pyhsists_name`,`department`,`detail`,`ct_count`) VALUES (?,?,?,?,?,?,?,?,?)";
            jdbcTemplate.update(insertSQL, patients.get(j).getId(), patients.get(j).getName(),
                    patients.get(j).getPatId(),
                    patients.get(j).getDelDocId(),
                    patients.get(j).getDocName(),
                    patients.get(j).getPyhsistsName(), patients.get(j).getDepartment(), patients.get(j).getDetail(),
                            patients.get(j).getCtcount());
        }


        //刷新页面的新数据
        // 查询数据库
        String newSql = "select * from patients_info ";

        List<Patient> resP = jdbcTemplate.query(newSql, new RowMapper<Patient>() {
            @Override
            public Patient mapRow(ResultSet rs, int rowNum) throws SQLException {
                Patient patient = new Patient();
                patient.setDelDocId(docId);
                patient.setId(rs.getInt("id"));
                patient.setName(rs.getString("name"));
                patient.setPatId(rs.getInt("patId"));
                patient.setDocName(rs.getString("doc_name"));
                patient.setPyhsistsName(rs.getString("pyhsists_name"));
                patient.setDepartment(rs.getString("department"));
                patient.setDetail(rs.getString("detail"));
                patient.setCtcount(rs.getInt("ct_count"));
                patient.setCreatetime(rs.getTime("createtime"));

                return patient;
            }
        });

        deletePatRsp.setMsg("成功");
        deletePatRsp.setPatient(resP);
        System.out.println(deletePatRsp.getMsg());
        return deletePatRsp;
    }
}
