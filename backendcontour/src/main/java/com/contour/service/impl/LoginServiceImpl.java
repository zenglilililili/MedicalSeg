package com.contour.service.impl;

import com.contour.params.LoginReq;
import com.contour.params.LoginRsp;
import com.contour.params.Physists;
import com.contour.service.LoginService;
import org.apache.commons.lang.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class LoginServiceImpl implements LoginService {

    @Resource
    private JdbcTemplate jdbcTemplate;


    @Override
    public LoginRsp login(LoginReq loginReq) {
        LoginRsp loginRsp = new LoginRsp();

        String name = loginReq.getName();
        String password = loginReq.getPassword();

        if (StringUtils.isBlank(name) || StringUtils.isBlank(password)) {
            loginRsp.setMsg("姓名或密码为空");
            return loginRsp;
        }
        // 查询数据库
        String sql = "select `id`,`name`,`password` from physists";

        List<Physists> physists = jdbcTemplate.query(sql, new RowMapper<Physists>() {
            @Override
            public Physists mapRow(ResultSet rs, int rowNum) throws SQLException {
                Physists physist = new Physists();
                physist.setId(rs.getInt("id"));
                physist.setName(rs.getString("name"));
                physist.setPassword(rs.getString("password"));
                return physist;
            }
        });

        for (int i = 0; i < physists.size(); i++) {
            Physists physistsTmp = physists.get(i);
            if (physistsTmp.getName().equals(name) && physistsTmp.getPassword().equals(password)) {

                loginRsp.setMsg("成功");
                loginRsp.setId(physistsTmp.getId().toString());
                return loginRsp;
            }
        }

        loginRsp.setMsg("姓名或密码错误");
        return loginRsp;
    }
}
