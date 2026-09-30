package com.portfolio.employee_management_api.controller;

import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import com.portfolio.employee_management_api.dto.CreateUserRequest;
import com.portfolio.employee_management_api.dto.UpdateUserRequest;
import com.portfolio.employee_management_api.dto.UserAccountResponse;
import com.portfolio.employee_management_api.service.UserAccountService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
@SecurityRequirement(name = "bearerAuth")
public class UserAccountController {
    private final UserAccountService userAccountService;

    public UserAccountController(UserAccountService userAccountService) {
        this.userAccountService = userAccountService;
    }

    @GetMapping
    public List<UserAccountResponse> listAccounts() {
        return userAccountService.listAccounts();
    }

    @PostMapping
    public ResponseEntity<UserAccountResponse> createAccount(@Valid @RequestBody CreateUserRequest request) {
        UserAccountResponse response = userAccountService.createAccount(request);
        return ResponseEntity.created(URI.create("/api/v1/users/" + response.id())).body(response);
    }

    @PatchMapping("/{id}")
    public UserAccountResponse updateAccount(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest request,
            Authentication authentication) {
        return userAccountService.updateAccount(id, request, authentication.getName());
    }
}
