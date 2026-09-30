package com.portfolio.employee_management_api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI employeeManagementOpenAPI() {

        return new OpenAPI()
                .components(new Components().addSecuritySchemes(
                        "bearerAuth",
                        new SecurityScheme().type(Type.HTTP).scheme("bearer").bearerFormat("JWT")))
                .info(new Info()
                        .title("Employee Management API")
                        .description(
                                "REST API for managing employees with " +
                                "CRUD operations, pagination, filtering, " +
                                "sorting, validation and authentication."
                        )
                        .version("1.0.0"));
    }
}
