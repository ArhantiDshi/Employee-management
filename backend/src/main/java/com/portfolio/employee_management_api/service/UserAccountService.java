package com.portfolio.employee_management_api.service;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import com.portfolio.employee_management_api.dto.CreateUserRequest;
import com.portfolio.employee_management_api.dto.UpdateUserRequest;
import com.portfolio.employee_management_api.dto.UserAccountResponse;
import com.portfolio.employee_management_api.entity.AccountRole;
import com.portfolio.employee_management_api.entity.UserAccount;
import com.portfolio.employee_management_api.exception.UsernameAlreadyExistsException;
import com.portfolio.employee_management_api.repository.UserAccountRepository;

@Service
public class UserAccountService {
    private final UserAccountRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserAccountService(UserAccountRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<UserAccountResponse> listAccounts() {
        return repository.findAllByOrderByUsernameAsc().stream().map(UserAccountResponse::from).toList();
    }

    @Transactional
    public UserAccountResponse createAccount(CreateUserRequest request) {
        String normalizedUsername = request.username().trim().toLowerCase(java.util.Locale.ROOT);
        if (repository.existsByUsername(normalizedUsername)) throw new UsernameAlreadyExistsException(normalizedUsername);
        UserAccount account = new UserAccount(normalizedUsername, passwordEncoder.encode(request.password()), request.role());
        return UserAccountResponse.from(repository.save(account));
    }

    @Transactional
    public UserAccountResponse updateAccount(Long id, UpdateUserRequest request, String currentUsername) {
        UserAccount account = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));
        AccountRole nextRole = request.role() == null ? account.getRole() : request.role();
        boolean nextEnabled = request.enabled() == null ? account.isEnabled() : request.enabled();
        boolean losingAdminAccess = account.getRole() == AccountRole.ADMIN && account.isEnabled()
                && (nextRole != AccountRole.ADMIN || !nextEnabled);

        if (account.getUsername().equals(currentUsername) && (nextRole != AccountRole.ADMIN || !nextEnabled)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot remove your own admin access");
        }
        if (losingAdminAccess && repository.countByRoleAndEnabledTrue(AccountRole.ADMIN) <= 1) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "At least one enabled administrator must remain");
        }

        account.setRole(nextRole);
        account.setEnabled(nextEnabled);
        if (request.password() != null && !request.password().isBlank()) {
            account.setPasswordHash(passwordEncoder.encode(request.password()));
        }
        return UserAccountResponse.from(repository.save(account));
    }
}
