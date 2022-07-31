package com.contour.params;

import java.sql.Time;
import java.util.List;

public class Contour {
    Integer contourId;
    Integer patId;
    String patPath;
    Integer ctId;
    Integer sliceId;
    Integer modelId;
    String modelName;
    String color;
    String conStr;
    List<List<Integer>> contour;


    public Integer getContourId() {
        return contourId;
    }

    public void setContourId(Integer contourId) {
        this.contourId = contourId;
    }

    public Integer getPatId() {
        return patId;
    }

    public void setPatId(Integer patId) {
        this.patId = patId;
    }

    public String getPatPath() {
        return patPath;
    }

    public void setPatPath(String patPath) {
        this.patPath = patPath;
    }

    public Integer getCtId() {
        return ctId;
    }

    public void setCtId(Integer ctId) {
        this.ctId = ctId;
    }

    public Integer getSliceId() {
        return sliceId;
    }

    public void setSliceId(Integer sliceId) {
        this.sliceId = sliceId;
    }

    public Integer getModelId() {
        return modelId;
    }

    public void setModelId(Integer modelId) {
        this.modelId = modelId;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getConStr() {
        return conStr;
    }

    public void setConStr(String conStr) {
        this.conStr = conStr;
    }

    public List<List<Integer>> getContour() {
        return contour;
    }

    public void setContour(List<List<Integer>> contour) {
        this.contour = contour;
    }

    @Override
    public String toString() {
        return "Contour{" +
                "contourId=" + contourId +
                ", patId=" + patId +
                ", patPath='" + patPath + '\'' +
                ", ctId=" + ctId +
                ", sliceId=" + sliceId +
                ", modelId=" + modelId +
                ", modelName='" + modelName + '\'' +
                ", color='" + color + '\'' +
                ", contour='" + contour + '\'' +
                '}';
    }
}
