package com.portfolio.employee_management_api.exception;

public class UsernameAlreadyExistsException extends RuntimeException {
    public UsernameAlreadyExistsException(String username) {
        super("An account with username " + username + " already exists");
    }
}
