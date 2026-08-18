package com.portfolio.employee_management_api.controller;

import com.portfolio.employee_management_api.dto.EmployeeRequest;
import com.portfolio.employee_management_api.entity.Employee;
import com.portfolio.employee_management_api.entity.EmployeeStatus;
import com.portfolio.employee_management_api.exception.DuplicateEmailException;
import com.portfolio.employee_management_api.exception.EmployeeNotFoundException;
import com.portfolio.employee_management_api.service.EmployeeService;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import org.junit.jupiter.api.Test;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import java.util.List;
import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@WebMvcTest(EmployeeController.class)

@AutoConfigureMockMvc(addFilters = false)

class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

   @MockitoBean
private EmployeeService employeeService;

    @Test
    void getEmployeeById_shouldReturnEmployee() throws Exception {

        Employee employee = Employee.builder()
                .id(1L)
                .firstName("Rahul")
                .lastName("Shah")
                .email("rahul.shah@example.com")
                .department("Engineering")
                .designation("Software Developer")
                .salary(new BigDecimal("85000"))
                .build();

        when(employeeService.getEmployeeById(1L))
                .thenReturn(employee);

        mockMvc.perform(
                get("/api/v1/employees/1")
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(1))
        .andExpect(jsonPath("$.firstName").value("Rahul"))
        .andExpect(jsonPath("$.lastName").value("Shah"))
        .andExpect(jsonPath("$.email")
                .value("rahul.shah@example.com"));
    }



    @Test
void getEmployeeById_shouldReturn404_whenEmployeeDoesNotExist()
        throws Exception {

    when(employeeService.getEmployeeById(999L))
            .thenThrow(
                    new EmployeeNotFoundException(
                            "Employee with id 999 not found"
                    )
            );

    mockMvc.perform(
            get("/api/v1/employees/999")
    )
    .andExpect(status().isNotFound())
    .andExpect(jsonPath("$.status").value(404))
    .andExpect(jsonPath("$.error")
            .value("Employee Not Found"))
    .andExpect(jsonPath("$.message")
            .value("Employee with id 999 not found"));
}

@Test
void createEmployee_shouldReturn201_whenRequestIsValid()
        throws Exception {

    Employee employee = Employee.builder()
            .id(1L)
            .firstName("John")
            .lastName("Smith")
            .email("john.smith@example.com")
            .phone("9876543210")
            .department("IT")
            .designation("Software Developer")
            .salary(new BigDecimal("85000"))
            .joiningDate(LocalDate.of(2026, 8, 17))
            .status(EmployeeStatus.ACTIVE)
            .build();

    when(employeeService.createEmployee(any(EmployeeRequest.class)))
            .thenReturn(employee);

    String requestBody = """
            {
                "firstName": "John",
                "lastName": "Smith",
                "email": "john.smith@example.com",
                "phone": "9876543210",
                "department": "IT",
                "designation": "Software Developer",
                "salary": 85000,
                "joiningDate": "2026-08-17"
            }
            """;

    mockMvc.perform(
            post("/api/v1/employees")
                    .contentType("application/json")
                    .content(requestBody)
    )
    .andExpect(status().isCreated())
    .andExpect(jsonPath("$.id").value(1))
    .andExpect(jsonPath("$.firstName").value("John"))
    .andExpect(jsonPath("$.lastName").value("Smith"))
    .andExpect(jsonPath("$.email")
            .value("john.smith@example.com"))
    .andExpect(jsonPath("$.department").value("IT"));
}


@Test
void createEmployee_shouldReturn400_whenRequestIsInvalid()
        throws Exception {

    String requestBody = """
            {
                "firstName": "",
                "lastName": "",
                "email": "invalid-email",
                "salary": 0
            }
            """;

    mockMvc.perform(
            post("/api/v1/employees")
                    .contentType("application/json")
                    .content(requestBody)
    )
    .andExpect(status().isBadRequest())
    .andExpect(jsonPath("$.status").value(400))
    .andExpect(jsonPath("$.error")
            .value("Validation Failed"))
    .andExpect(jsonPath("$.errors.firstName")
            .value("First name is required"))
    .andExpect(jsonPath("$.errors.lastName")
            .value("Last name is required"))
    .andExpect(jsonPath("$.errors.email")
            .value("Invalid email format"))
    .andExpect(jsonPath("$.errors.joiningDate")
            .value("Joining date is required"))
    .andExpect(jsonPath("$.errors.salary")
            .value("Salary must be greater than zero"));
}


@Test
void createEmployee_shouldReturn409_whenEmailAlreadyExists()
        throws Exception {

    when(employeeService.createEmployee(any(EmployeeRequest.class)))
            .thenThrow(
                    new DuplicateEmailException(
                            "Employee with email john.smith@example.com already exists"
                    )
            );

    String requestBody = """
            {
                "firstName": "John",
                "lastName": "Smith",
                "email": "john.smith@example.com",
                "phone": "9876543210",
                "department": "IT",
                "designation": "Software Developer",
                "salary": 85000,
                "joiningDate": "2026-08-17"
            }
            """;

    mockMvc.perform(
            post("/api/v1/employees")
                    .contentType("application/json")
                    .content(requestBody)
    )
    .andExpect(status().isConflict())
    .andExpect(jsonPath("$.status").value(409))
    .andExpect(jsonPath("$.error")
            .value("Duplicate Email"))
    .andExpect(jsonPath("$.message")
            .value("Employee with email john.smith@example.com already exists"));
}

@Test
void getAllEmployees_shouldReturnEmployeesWithPagination()
        throws Exception {

    Employee employee = Employee.builder()
            .id(1L)
            .firstName("Rahul")
            .lastName("Shah")
            .email("rahul.shah@example.com")
            .department("Engineering")
            .designation("Software Developer")
            .salary(new BigDecimal("85000"))
            .build();

    Page<Employee> page =
            new PageImpl<>(
                    List.of(employee),
                    PageRequest.of(0, 10),
                    1
            );

    when(employeeService.getAllEmployees(
            any(String.class),
            any(String.class),
            any(EmployeeStatus.class),
            any(Pageable.class)
    )).thenReturn(page);

    mockMvc.perform(
            get("/api/v1/employees")
                    .param("search", "Rahul")
                    .param("department", "Engineering")
                    .param("status", "ACTIVE")
                    .param("page", "0")
                    .param("size", "10")
                    .param("sort", "salary,desc")
    )
    .andExpect(status().isOk())
    .andExpect(jsonPath("$.content").isArray())
    .andExpect(jsonPath("$.content[0].id").value(1))
    .andExpect(jsonPath("$.content[0].firstName")
            .value("Rahul"))
    .andExpect(jsonPath("$.content[0].department")
            .value("Engineering"))
    .andExpect(jsonPath("$.totalElements").value(1))
    .andExpect(jsonPath("$.totalPages").value(1))
    .andExpect(jsonPath("$.size").value(10));
}


@Test
void updateEmployee_shouldReturn200_whenEmployeeExists()
        throws Exception {

    Employee employee = Employee.builder()
            .id(1L)
            .firstName("Rahul")
            .lastName("Shah")
            .email("rahul.shah@example.com")
            .phone("9876543210")
            .department("Engineering")
            .designation("Senior Software Developer")
            .salary(new BigDecimal("95000"))
            .joiningDate(LocalDate.of(2026, 8, 11))
            .status(EmployeeStatus.ACTIVE)
            .build();

    when(employeeService.updateEmployee(
            any(Long.class),
            any(EmployeeRequest.class)
    )).thenReturn(employee);

    String requestBody = """
            {
                "firstName": "Rahul",
                "lastName": "Shah",
                "email": "rahul.shah@example.com",
                "phone": "9876543210",
                "department": "Engineering",
                "designation": "Senior Software Developer",
                "salary": 95000,
                "joiningDate": "2026-08-11"
            }
            """;

    mockMvc.perform(
            put("/api/v1/employees/1")
                    .contentType("application/json")
                    .content(requestBody)
    )
    .andExpect(status().isOk())
    .andExpect(jsonPath("$.id").value(1))
    .andExpect(jsonPath("$.firstName").value("Rahul"))
    .andExpect(jsonPath("$.designation")
            .value("Senior Software Developer"))
    .andExpect(jsonPath("$.salary").value(95000));
}



@Test
void updateEmployee_shouldReturn404_whenEmployeeDoesNotExist()
        throws Exception {

    when(employeeService.updateEmployee(
            any(Long.class),
            any(EmployeeRequest.class)
    )).thenThrow(
            new EmployeeNotFoundException(
                    "Employee with id 999 not found"
            )
    );

    String requestBody = """
            {
                "firstName": "John",
                "lastName": "Smith",
                "email": "john.smith@example.com",
                "phone": "9876543210",
                "department": "IT",
                "designation": "Software Developer",
                "salary": 85000,
                "joiningDate": "2026-08-17"
            }
            """;

    mockMvc.perform(
            put("/api/v1/employees/999")
                    .contentType("application/json")
                    .content(requestBody)
    )
    .andExpect(status().isNotFound())
    .andExpect(jsonPath("$.status").value(404))
    .andExpect(jsonPath("$.error")
            .value("Employee Not Found"))
    .andExpect(jsonPath("$.message")
            .value("Employee with id 999 not found"));
}


@Test
void deleteEmployee_shouldReturn204_whenEmployeeExists()
        throws Exception {

    mockMvc.perform(
            delete("/api/v1/employees/1")
    )
    .andExpect(status().isNoContent());
}

@Test
void deleteEmployee_shouldReturn404_whenEmployeeDoesNotExist()
        throws Exception {

    doThrow(
            new EmployeeNotFoundException(
                    "Employee with id 999 not found"
            )
    ).when(employeeService).deleteEmployee(999L);

    mockMvc.perform(
            delete("/api/v1/employees/999")
    )
    .andExpect(status().isNotFound())
    .andExpect(jsonPath("$.status").value(404))
    .andExpect(jsonPath("$.error")
            .value("Employee Not Found"))
    .andExpect(jsonPath("$.message")
            .value("Employee with id 999 not found"));
}



}