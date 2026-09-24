package com.portfolio.employee_management_api.service;

import com.portfolio.employee_management_api.dto.EmployeeRequest;
import com.portfolio.employee_management_api.entity.Employee;
import com.portfolio.employee_management_api.entity.EmployeeStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EmployeeService {

    Employee createEmployee(EmployeeRequest request);
Page<Employee> getAllEmployees(
        String search,
        String department,
        EmployeeStatus status,
        Pageable pageable
);
     Employee getEmployeeById(Long id);

    Employee updateEmployee(Long id, EmployeeRequest request);

    void deleteEmployee(Long id);
}