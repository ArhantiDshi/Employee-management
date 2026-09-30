package com.portfolio.employee_management_api.dto;

import java.time.LocalDateTime;
import com.portfolio.employee_management_api.entity.UserAccount;

public record UserAccountResponse(Long id, String username, String role, boolean enabled, LocalDateTime createdAt) {
    public static UserAccountResponse from(UserAccount account) {
        return new UserAccountResponse(account.getId(), account.getUsername(), account.getRole().name(), account.isEnabled(), account.getCreatedAt());
    }
}
