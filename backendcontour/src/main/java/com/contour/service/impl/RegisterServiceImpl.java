package com.contour.service.impl;

import com.contour.params.Physists;
import com.contour.service.RegisterService;
import org.apache.commons.lang.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Resource
    private JdbcTemplate jdbcTemplate;


    @Override
    public Boolean register(Physists registerReq) {
        String name = registerReq.getName();
        Integer id = registerReq.getId();

        if (StringUtils.isBlank(name) || id == null) {
            System.out.println("请求信息有错");
            System.out.println(id);
            System.out.println(name);
            return false;
        }
        // 查询数据库
        String sql = "select * from physists where id=" + id + " and name='" + name + "';";

        List<Physists> physists = jdbcTemplate.query(sql, new RowMapper<Physists>() {
            @Override
            public Physists mapRow(ResultSet rs, int rowNum) throws SQLException {
                Physists physist = new Physists();
                physist.setId(rs.getInt("id"));
                physist.setName(rs.getString("name"));
                return physist;
            }
        });

        if (physists.size() > 0) {
            return false;
        }
        System.out.println("数据库无此医生记录");
        String insertSQL = "insert into physists(`id`,`name`,`position`,`department`,`password`,`prefix`,`phoneNum`) VALUES (?,?,?,?,?,?,?)";
        jdbcTemplate.update(insertSQL, id, name, registerReq.getPosition(), registerReq.getDepartment()[0] + "|" + registerReq.getDepartment()[1], registerReq.getPassword(), registerReq.getPrefix(), registerReq.getPhoneNum());


        return true;
    }


}
