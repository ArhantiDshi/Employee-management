package com.portfolio.employee_management_api.dto;

import com.portfolio.employee_management_api.entity.AccountRole;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(
        AccountRole role,
        Boolean enabled,
        @Size(min = 12, max = 72, message = "Password must be between 12 and 72 characters")
        String password) {
}
