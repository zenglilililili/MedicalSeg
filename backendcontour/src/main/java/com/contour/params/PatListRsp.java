package com.contour.params;

import java.sql.Time;
import java.util.List;

public class PatListRsp {
    String msg;
    List<Patient> patient;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public List<Patient> getPatient() {
        return patient;
    }

    public void setPatient(List<Patient> patient) {
        this.patient = patient;
    }
}
