package com.portfolio.employee_management_api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import com.portfolio.employee_management_api.entity.AccountRole;
import com.portfolio.employee_management_api.entity.UserAccount;
import com.portfolio.employee_management_api.repository.UserAccountRepository;

@Configuration
public class AdminAccountBootstrap {
    @Bean
    ApplicationRunner createFirstAdmin(UserAccountRepository repository, PasswordEncoder passwordEncoder,
            @Value("${app.admin.username}") String username, @Value("${app.admin.password}") String password) {
        return args -> {
            if (repository.count() == 0) {
                if (!StringUtils.hasText(username) || !StringUtils.hasText(password)
                        || password.length() < 12 || password.length() > 72) {
                    throw new IllegalStateException("Initial admin username and a 12-72 character ADMIN_PASSWORD are required");
                }
                repository.save(new UserAccount(username.trim().toLowerCase(java.util.Locale.ROOT),
                        passwordEncoder.encode(password), AccountRole.ADMIN));
            }
        };
    }
}
