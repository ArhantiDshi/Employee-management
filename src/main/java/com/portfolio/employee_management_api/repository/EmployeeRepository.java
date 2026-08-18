package com.portfolio.employee_management_api.repository;

import com.portfolio.employee_management_api.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository
        extends JpaRepository<Employee, Long>,
                JpaSpecificationExecutor<Employee> {

    boolean existsByEmail(String email);

    Optional<Employee> findByEmail(String email);
}