package com.portfolio.employee_management_api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.employee_management_api.entity.AccountRole;
import com.portfolio.employee_management_api.entity.UserAccount;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByUsername(String username);
    boolean existsByUsername(String username);
    long countByRoleAndEnabledTrue(AccountRole role);
    List<UserAccount> findAllByOrderByUsernameAsc();
}
