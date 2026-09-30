package com.portfolio.employee_management_api.dto;

import com.portfolio.employee_management_api.entity.AccountRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(
        @NotBlank
        @Pattern(regexp = "^[A-Za-z0-9._-]{3,80}$", message = "Use 3-80 letters, digits, dots, dashes or underscores")
        String username,
        @NotBlank @Size(min = 12, max = 72, message = "Password must be between 12 and 72 characters")
        String password,
        @NotNull AccountRole role) {
}
