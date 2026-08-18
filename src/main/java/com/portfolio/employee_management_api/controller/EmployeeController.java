package com.portfolio.employee_management_api.controller;

import com.portfolio.employee_management_api.dto.EmployeePageResponse;
import com.portfolio.employee_management_api.dto.EmployeeRequest;
import com.portfolio.employee_management_api.entity.Employee;
import com.portfolio.employee_management_api.entity.EmployeeStatus;
import com.portfolio.employee_management_api.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/v1/employees")
@SecurityRequirement(name = "basicAuth")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

@Operation(
        summary = "Create employee",
        description = "Creates a new employee in the system"
)
@ApiResponses({
        @ApiResponse(
                responseCode = "201",
                description = "Employee created successfully"
        ),
        @ApiResponse(
                responseCode = "400",
                description = "Validation failed"
        ),
        @ApiResponse(
                responseCode = "409",
                description = "Employee with the email already exists"
        ),
        @ApiResponse(
                responseCode = "401",
                description = "Authentication required"
        )
})
@PostMapping
public ResponseEntity<Employee> createEmployee(
        @Valid @RequestBody EmployeeRequest request) {

    Employee employee = employeeService.createEmployee(request);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(employee);
}
@Operation(
        summary = "Get employees",
        description = "Retrieves employees with pagination, filtering, search and sorting"
)
@ApiResponses({
        @ApiResponse(
                responseCode = "200",
                description = "Employees retrieved successfully"
        ),
        @ApiResponse(
                responseCode = "401",
                description = "Authentication required"
        )
})
@GetMapping
public ResponseEntity<Page<Employee>> getAllEmployees(
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String department,
        @RequestParam(required = false) EmployeeStatus status,
        @ParameterObject Pageable pageable) {

    Page<Employee> employees =
            employeeService.getAllEmployees(
                    search,
                    department,
                    status,
                    pageable
            );

    return ResponseEntity.ok(employees);
}


@Operation(
        summary = "Get employee by ID",
        description = "Retrieves an employee using their unique ID"
)
@ApiResponses({
        @ApiResponse(
                responseCode = "200",
                description = "Employee found"
        ),
        @ApiResponse(
                responseCode = "404",
                description = "Employee not found"
        ),
        @ApiResponse(
                responseCode = "401",
                description = "Authentication required"
        )
})
@GetMapping("/{id}")
public ResponseEntity<Employee> getEmployeeById(
        @PathVariable Long id) {

    return ResponseEntity.ok(
            employeeService.getEmployeeById(id)
    );
}

@Operation(
        summary = "Update employee",
        description = "Updates an existing employee"
)
@ApiResponses({
        @ApiResponse(
                responseCode = "200",
                description = "Employee updated successfully"
        ),
        @ApiResponse(
                responseCode = "400",
                description = "Validation failed"
        ),
        @ApiResponse(
                responseCode = "404",
                description = "Employee not found"
        ),
        @ApiResponse(
                responseCode = "401",
                description = "Authentication required"
        )
})
@PutMapping("/{id}")
public ResponseEntity<Employee> updateEmployee(
        @PathVariable Long id,
        @Valid @RequestBody EmployeeRequest request) {

    Employee employee =
            employeeService.updateEmployee(id, request);

    return ResponseEntity.ok(employee);
}

@Operation(
        summary = "Delete employee",
        description = "Deletes an employee using their unique ID"
)
@ApiResponses({
        @ApiResponse(
                responseCode = "204",
                description = "Employee deleted successfully"
        ),
        @ApiResponse(
                responseCode = "404",
                description = "Employee not found"
        ),
        @ApiResponse(
                responseCode = "401",
                description = "Authentication required"
        )
})
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteEmployee(
        @PathVariable Long id) {

    employeeService.deleteEmployee(id);

    return ResponseEntity.noContent().build();
}




}