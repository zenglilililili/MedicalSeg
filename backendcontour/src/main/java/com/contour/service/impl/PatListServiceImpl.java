package com.contour.service.impl;

import com.contour.params.PatListRsp;
import com.contour.params.Patient;
import com.contour.params.Physists;
import com.contour.service.PatListService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class PatListServiceImpl implements PatListService {

    @Resource
    private JdbcTemplate jdbcTemplate;


    @Override
    public @ResponseBody
    PatListRsp patList(Physists patListReq) {
        PatListRsp patListRsp = new PatListRsp();
        Integer id = patListReq.getId();
        if(id == null){
            patListRsp.setMsg("未传入医生ID");
            return patListRsp;
        }

        String sql = "select id,name from physists where id=" + id.toString();

        List<Physists> physists = jdbcTemplate.query(sql, new RowMapper<Physists>() {
            @Override
            public Physists mapRow(ResultSet rs, int rowNum) throws SQLException {
                Physists physist = new Physists();
                physist.setId(rs.getInt("id"));
                physist.setName(rs.getString("name"));
                return physist;
            }
        });

        if (physists.size() == 0) {
            System.out.println("数据库无此医生负责的病患数据");
            patListRsp.setMsg("数据库无此医生负责的病患数据");
            return patListRsp;
        }

        String patListSQL = "select * from patients_info where doc_name='" + physists.get(0).getName() + "';";
        List<Patient> patients = jdbcTemplate.query(patListSQL, new RowMapper<Patient>() {
            @Override
            public Patient mapRow(ResultSet rs, int rowNum) throws SQLException {
                Patient patient = new Patient();
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
        patListRsp.setMsg("成功");
        patListRsp.setPatient(patients);
        System.out.println(patListRsp.getMsg());
        return patListRsp;
    }
}
