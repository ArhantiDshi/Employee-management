package com.portfolio.employee_management_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleEmployeeNotFound(
            EmployeeNotFoundException ex) {

        Map<String, Object> response = new HashMap<>();

        response.put("status", HttpStatus.NOT_FOUND.value());
        response.put("error", "Employee Not Found");
        response.put("message", ex.getMessage());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }


@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, Object>> handleValidationErrors(
        MethodArgumentNotValidException ex) {

    Map<String, String> errors = new HashMap<>();

    ex.getBindingResult()
            .getFieldErrors()
            .forEach(error ->
                    errors.put(
                            error.getField(),
                            error.getDefaultMessage()
                    )
            );

    Map<String, Object> response = new HashMap<>();

    response.put("status", HttpStatus.BAD_REQUEST.value());
    response.put("error", "Validation Failed");
    response.put("errors", errors);

    return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(response);
}

@ExceptionHandler(DuplicateEmailException.class)
public ResponseEntity<Map<String, Object>> handleDuplicateEmail(
        DuplicateEmailException ex) {

    Map<String, Object> response = new HashMap<>();

    response.put("status", HttpStatus.CONFLICT.value());
    response.put("error", "Duplicate Email");
    response.put("message", ex.getMessage());

    return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(response);
}

@ExceptionHandler(DuplicateEmployeeException.class)
public ResponseEntity<Map<String, Object>> handleDuplicateEmployee(
        DuplicateEmployeeException ex) {

    Map<String, Object> response = new HashMap<>();

    response.put("status", HttpStatus.CONFLICT.value());
    response.put("error", "Employee Already Exists");
    response.put("message", ex.getMessage());

    return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(response);
}



}