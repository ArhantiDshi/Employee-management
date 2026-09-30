package com.portfolio.employee_management_api.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Value("${CORS_ALLOWED_ORIGINS:http://localhost:*,http://127.0.0.1:*}")
    private String[] allowedOriginPatterns;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .cors(Customizer.withDefaults())

            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth

                // Swagger
                .requestMatchers(
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**"
                ).permitAll()

                // CORS preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Login is the only public API operation
                .requestMatchers(HttpMethod.POST, "/api/v1/auth/login").permitAll()

                // Account administration is restricted to administrators.
                .requestMatchers("/api/v1/users/**").hasAuthority("SCOPE_ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/v1/dashboard", "/api/v1/dashboard/**")
                    .hasAnyAuthority("SCOPE_ADMIN", "SCOPE_HR_MANAGER", "SCOPE_VIEWER")
                .requestMatchers(HttpMethod.GET, "/api/v1/employees", "/api/v1/employees/**")
                    .hasAnyAuthority("SCOPE_ADMIN", "SCOPE_HR_MANAGER")
                .requestMatchers("/api/v1/employees", "/api/v1/employees/**", "/api/v1/dashboard", "/api/v1/dashboard/**")
                    .hasAnyAuthority("SCOPE_ADMIN", "SCOPE_HR_MANAGER")
                .requestMatchers("/api/v1/**").hasAuthority("SCOPE_ADMIN")

                // Everything else requires authentication
                .anyRequest().authenticated()
            )

            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // Frontend origins for local development and deployed Vercel app
        configuration.setAllowedOriginPatterns(
            Arrays.asList(allowedOriginPatterns)
        );

        // Allow HTTP methods
        configuration.setAllowedMethods(
            List.of(
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
            )
        );

        // Allow request headers
        configuration.setAllowedHeaders(
            List.of("*")
        );

        // Authentication uses an Authorization bearer header, not cookies.
        configuration.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
            "/**",
            configuration
        );

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
