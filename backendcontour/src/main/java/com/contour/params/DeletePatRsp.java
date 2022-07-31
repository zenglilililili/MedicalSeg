package com.contour.params;

import lombok.Data;

import java.util.List;

@Data
public class DeletePatRsp {
    private String msg;
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
