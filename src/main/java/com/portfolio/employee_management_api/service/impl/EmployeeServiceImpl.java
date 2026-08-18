package com.portfolio.employee_management_api.service.impl;

import com.portfolio.employee_management_api.dto.EmployeeRequest;
import com.portfolio.employee_management_api.entity.Employee;
import com.portfolio.employee_management_api.entity.EmployeeStatus;
import com.portfolio.employee_management_api.exception.DuplicateEmailException;
import com.portfolio.employee_management_api.exception.DuplicateEmployeeException;
import com.portfolio.employee_management_api.exception.EmployeeNotFoundException;
import com.portfolio.employee_management_api.repository.EmployeeRepository;
import com.portfolio.employee_management_api.service.EmployeeService;
import com.portfolio.employee_management_api.specification.EmployeeSpecification;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee createEmployee(EmployeeRequest request) {

      if (employeeRepository.existsByEmail(request.getEmail())) {
    throw new DuplicateEmployeeException(
            "Employee with email " + request.getEmail() + " already exists"
    );
}

        Employee employee = Employee.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .department(request.getDepartment())
                .designation(request.getDesignation())
                .salary(request.getSalary())
                .joiningDate(request.getJoiningDate())
                .status(EmployeeStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return employeeRepository.save(employee);
    }

 @Override
public Page<Employee> getAllEmployees(
        String search,
        String department,
        EmployeeStatus status,
        Pageable pageable) {

    Specification<Employee> specification =
            Specification.where(
                    EmployeeSpecification.search(search)
            );

    specification = specification.and(
            EmployeeSpecification.hasDepartment(department)
    );

    specification = specification.and(
            EmployeeSpecification.hasStatus(status)
    );

    return employeeRepository.findAll(
            specification,
            pageable
    );
}
    
     @Override
public Employee getEmployeeById(Long id) {

    return employeeRepository.findById(id)
            .orElseThrow(() ->
                    new EmployeeNotFoundException(
                            "Employee with id " + id + " not found"
                    )
            );
}

@Override
public Employee updateEmployee(Long id, EmployeeRequest request) {

    Employee employee = employeeRepository.findById(id)
            .orElseThrow(() ->
                    new EmployeeNotFoundException(
                            "Employee with id " + id + " not found"
                    )
            );

    employee.setFirstName(request.getFirstName());
    employee.setLastName(request.getLastName());
    employee.setEmail(request.getEmail());
    employee.setPhone(request.getPhone());
    employee.setDepartment(request.getDepartment());
    employee.setDesignation(request.getDesignation());
    employee.setSalary(request.getSalary());
    employee.setJoiningDate(request.getJoiningDate());
    employee.setUpdatedAt(LocalDateTime.now());

    return employeeRepository.save(employee);
}

@Override
public void deleteEmployee(Long id) {

    Employee employee = employeeRepository.findById(id)
            .orElseThrow(() ->
                    new EmployeeNotFoundException(
                            "Employee with id " + id + " not found"
                    )
            );

    employeeRepository.delete(employee);
}



}