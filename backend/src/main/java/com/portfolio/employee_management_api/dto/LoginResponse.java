package com.portfolio.employee_management_api.dto;

import java.time.Instant;

public record LoginResponse(String accessToken, Instant expiresAt, String username, String role) {
}
