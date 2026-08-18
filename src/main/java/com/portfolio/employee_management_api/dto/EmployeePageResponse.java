package com.portfolio.employee_management_api.dto;

import com.portfolio.employee_management_api.entity.Employee;

import java.util.List;

public class EmployeePageResponse {

    private List<Employee> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;

    public EmployeePageResponse(
            List<Employee> content,
            int page,
            int size,
            long totalElements,
            int totalPages) {

        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public List<Employee> getContent() {
        return content;
    }

    public int getPage() {
        return page;
    }

    public int getSize() {
        return size;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }
}