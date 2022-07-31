package com.contour.params;

import java.sql.Time;

public class Patient {
    Integer id;
    String name;
    Integer patId;
    Integer delDocId;
    String docName;
    String pyhsistsName;
    String department;
    Integer ctcount;
    String detail;
    Time createtime;

    @Override
    public String toString() {
        return "Patient{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", patId=" + patId +
                ", delDocId=" + delDocId +
                ", docName='" + docName + '\'' +
                ", pyhsistsName='" + pyhsistsName + '\'' +
                ", department='" + department + '\'' +
                ", ctcount=" + ctcount +
                ", detail='" + detail + '\'' +
                ", createtime=" + createtime +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPatId() {
        return patId;
    }

    public void setPatId(Integer patId) {
        this.patId = patId;
    }

    public Integer getDelDocId() {
        return delDocId;
    }

    public void setDelDocId(Integer delDocId) {
        this.delDocId = delDocId;
    }

    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public String getPyhsistsName() {
        return pyhsistsName;
    }

    public void setPyhsistsName(String pyhsistsName) {
        this.pyhsistsName = pyhsistsName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getCtcount() {
        return ctcount;
    }

    public void setCtcount(Integer ctcount) {
        this.ctcount = ctcount;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Time getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Time createtime) {
        this.createtime = createtime;
    }
}
