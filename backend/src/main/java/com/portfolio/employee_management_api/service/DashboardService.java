package com.portfolio.employee_management_api.service;

import com.portfolio.employee_management_api.dto.DashboardResponse;
import com.portfolio.employee_management_api.entity.Employee;
import com.portfolio.employee_management_api.entity.EmployeeStatus;
import com.portfolio.employee_management_api.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final EmployeeRepository employeeRepository;

    public DashboardService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public DashboardResponse getDashboard() {

        // Get all employees
        List<Employee> employees = employeeRepository.findAll();

        // Total employees
        long totalEmployees = employees.size();

        // Active employees
        long activeEmployees = employees.stream()
                .filter(employee -> employee.getStatus() == EmployeeStatus.ACTIVE)
                .count();

        // Inactive employees
        long inactiveEmployees = employees.stream()
                .filter(employee -> employee.getStatus() == EmployeeStatus.INACTIVE)
                .count();

        // Employees grouped by department
        Map<String, Long> departmentMap = employees.stream()
                .filter(employee -> employee.getDepartment() != null)
                .collect(Collectors.groupingBy(
                        Employee::getDepartment,
                        Collectors.counting()
                ));

        long totalDepartments = departmentMap.size();

        List<DashboardResponse.DepartmentStat> departmentStats =
                departmentMap.entrySet()
                        .stream()
                        .map(entry ->
                                new DashboardResponse.DepartmentStat(
                                        entry.getKey(),
                                        entry.getValue()
                                )
                        )
                        .toList();

        // Recent employees
        List<DashboardResponse.RecentEmployee> recentEmployees =
                employees.stream()
                        .sorted((e1, e2) -> {
                            if (e1.getJoiningDate() == null) return 1;
                            if (e2.getJoiningDate() == null) return -1;

                            return e2.getJoiningDate()
                                    .compareTo(e1.getJoiningDate());
                        })
                        .limit(5)
                        .map(employee ->
                                new DashboardResponse.RecentEmployee(
                                        employee.getId(),
                                        employee.getFirstName(),
                                        employee.getLastName(),
                                        employee.getDepartment(),
                                        employee.getStatus() != null
                                                ? employee.getStatus().name()
                                                : null,
                                        employee.getJoiningDate() != null
                                                ? employee.getJoiningDate().toString()
                                                : null
                                )
                        )
                        .toList();

        return new DashboardResponse(
                totalEmployees,
                activeEmployees,
                inactiveEmployees,
                totalDepartments,
                departmentStats,
                recentEmployees
        );
    }
}