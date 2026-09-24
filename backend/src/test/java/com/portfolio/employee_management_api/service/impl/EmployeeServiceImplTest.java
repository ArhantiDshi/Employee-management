package com.portfolio.employee_management_api.service.impl;

import com.portfolio.employee_management_api.dto.EmployeeRequest;
import com.portfolio.employee_management_api.entity.Employee;
import com.portfolio.employee_management_api.exception.DuplicateEmailException;
import com.portfolio.employee_management_api.exception.EmployeeNotFoundException;
import com.portfolio.employee_management_api.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceImplTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    @Test
    void createEmployee_shouldCreateEmployeeSuccessfully() {

        EmployeeRequest request = new EmployeeRequest();

        request.setFirstName("John");
        request.setLastName("Smith");
        request.setEmail("john.smith@example.com");
        request.setPhone("9876543210");
        request.setDepartment("IT");
        request.setDesignation("Software Developer");
        request.setSalary(new BigDecimal("80000"));
        request.setJoiningDate(LocalDate.of(2026, 8, 1));

        when(employeeRepository.existsByEmail(request.getEmail()))
                .thenReturn(false);

        Employee savedEmployee = Employee.builder()
                .id(1L)
                .firstName("John")
                .lastName("Smith")
                .email("john.smith@example.com")
                .phone("9876543210")
                .department("IT")
                .designation("Software Developer")
                .salary(new BigDecimal("80000"))
                .joiningDate(LocalDate.of(2026, 8, 1))
                .build();

        when(employeeRepository.save(any(Employee.class)))
                .thenReturn(savedEmployee);

        Employee result = employeeService.createEmployee(request);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("John", result.getFirstName());
        assertEquals("Smith", result.getLastName());
        assertEquals("john.smith@example.com", result.getEmail());
        assertEquals("IT", result.getDepartment());

        verify(employeeRepository).existsByEmail(request.getEmail());
        verify(employeeRepository).save(any(Employee.class));
    }


@Test
void createEmployee_shouldThrowException_whenEmailAlreadyExists() {

    EmployeeRequest request = new EmployeeRequest();

    request.setFirstName("John");
    request.setLastName("Smith");
    request.setEmail("john.smith@example.com");

    when(employeeRepository.existsByEmail(request.getEmail()))
            .thenReturn(true);

  DuplicateEmailException exception = assertThrows(
        DuplicateEmailException.class,
        () -> employeeService.createEmployee(request)
);

    assertEquals(
            "Employee with email john.smith@example.com already exists",
            exception.getMessage()
    );

    verify(employeeRepository)
            .existsByEmail(request.getEmail());

    verify(employeeRepository, never())
            .save(any(Employee.class));
}

@Test
void getEmployeeById_shouldReturnEmployee_whenEmployeeExists() {

    Employee employee = Employee.builder()
            .id(1L)
            .firstName("Rahul")
            .lastName("Shah")
            .email("rahul.shah@example.com")
            .department("Engineering")
            .designation("Software Developer")
            .salary(new BigDecimal("85000"))
            .build();

    when(employeeRepository.findById(1L))
            .thenReturn(Optional.of(employee));

    Employee result = employeeService.getEmployeeById(1L);

    assertNotNull(result);
    assertEquals(1L, result.getId());
    assertEquals("Rahul", result.getFirstName());
    assertEquals("Shah", result.getLastName());
    assertEquals("rahul.shah@example.com", result.getEmail());

    verify(employeeRepository).findById(1L);
}
@Test
void getEmployeeById_shouldThrowException_whenEmployeeDoesNotExist() {

    when(employeeRepository.findById(999L))
            .thenReturn(Optional.empty());

    EmployeeNotFoundException exception = assertThrows(
            EmployeeNotFoundException.class,
            () -> employeeService.getEmployeeById(999L)
    );

    assertEquals(
            "Employee with id 999 not found",
            exception.getMessage()
    );

    verify(employeeRepository).findById(999L);
}


@Test
void updateEmployee_shouldUpdateEmployeeSuccessfully() {

    Employee existingEmployee = Employee.builder()
            .id(1L)
            .firstName("Rahul")
            .lastName("Shah")
            .email("rahul.shah@example.com")
            .department("Engineering")
            .designation("Software Developer")
            .salary(new BigDecimal("85000"))
            .joiningDate(LocalDate.of(2026, 8, 11))
            .build();

    EmployeeRequest request = new EmployeeRequest();

    request.setFirstName("Rahul");
    request.setLastName("Shah");
    request.setEmail("rahul.shah@example.com");
    request.setPhone("9876543210");
    request.setDepartment("Engineering");
    request.setDesignation("Senior Software Developer");
    request.setSalary(new BigDecimal("100000"));
    request.setJoiningDate(LocalDate.of(2026, 8, 11));

    when(employeeRepository.findById(1L))
            .thenReturn(Optional.of(existingEmployee));

    when(employeeRepository.save(any(Employee.class)))
            .thenAnswer(invocation -> invocation.getArgument(0));

    Employee result = employeeService.updateEmployee(1L, request);

    assertNotNull(result);
    assertEquals(1L, result.getId());
    assertEquals("Senior Software Developer", result.getDesignation());
    assertEquals(new BigDecimal("100000"), result.getSalary());
    assertEquals("Engineering", result.getDepartment());

    verify(employeeRepository).findById(1L);
    verify(employeeRepository).save(existingEmployee);
}



@Test
void updateEmployee_shouldThrowException_whenEmployeeDoesNotExist() {

    EmployeeRequest request = new EmployeeRequest();

    request.setFirstName("John");
    request.setLastName("Smith");
    request.setEmail("john@example.com");
    request.setDepartment("IT");
    request.setDesignation("Developer");
    request.setSalary(new BigDecimal("80000"));
    request.setJoiningDate(LocalDate.of(2026, 8, 1));

    when(employeeRepository.findById(999L))
            .thenReturn(Optional.empty());

    EmployeeNotFoundException exception = assertThrows(
            EmployeeNotFoundException.class,
            () -> employeeService.updateEmployee(999L, request)
    );

    assertEquals(
            "Employee with id 999 not found",
            exception.getMessage()
    );

    verify(employeeRepository).findById(999L);

    verify(employeeRepository, never())
            .save(any(Employee.class));
}


@Test
void deleteEmployee_shouldDeleteEmployeeSuccessfully() {

    Employee employee = Employee.builder()
            .id(1L)
            .firstName("Rahul")
            .lastName("Shah")
            .email("rahul.shah@example.com")
            .department("Engineering")
            .build();

    when(employeeRepository.findById(1L))
            .thenReturn(Optional.of(employee));

    employeeService.deleteEmployee(1L);

    verify(employeeRepository).findById(1L);
    verify(employeeRepository).delete(employee);
}

@Test
void deleteEmployee_shouldThrowException_whenEmployeeDoesNotExist() {

    when(employeeRepository.findById(999L))
            .thenReturn(Optional.empty());

    EmployeeNotFoundException exception = assertThrows(
            EmployeeNotFoundException.class,
            () -> employeeService.deleteEmployee(999L)
    );

    assertEquals(
            "Employee with id 999 not found",
            exception.getMessage()
    );

    verify(employeeRepository).findById(999L);

    verify(employeeRepository, never())
            .delete(any(Employee.class));
}
}