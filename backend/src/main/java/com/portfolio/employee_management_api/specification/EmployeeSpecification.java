package com.portfolio.employee_management_api.specification;

import com.portfolio.employee_management_api.entity.Employee;
import com.portfolio.employee_management_api.entity.EmployeeStatus;
import org.springframework.data.jpa.domain.Specification;

public class EmployeeSpecification {

    public static Specification<Employee> search(String search) {

        return (root, query, criteriaBuilder) -> {

            if (search == null || search.trim().isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            String value = "%" + search.toLowerCase() + "%";

            return criteriaBuilder.or(
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("firstName")),
                            value
                    ),
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("lastName")),
                            value
                    ),
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("email")),
                            value
                    ),
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("department")),
                            value
                    ),
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("designation")),
                            value
                    )
            );
        };
    }

    public static Specification<Employee> hasDepartment(
            String department) {

        return (root, query, criteriaBuilder) -> {

            if (department == null || department.trim().isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(
                    criteriaBuilder.lower(root.get("department")),
                    department.toLowerCase()
            );
        };
    }

    public static Specification<Employee> hasStatus(
            EmployeeStatus status) {

        return (root, query, criteriaBuilder) -> {

            if (status == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(
                    root.get("status"),
                    status
            );
        };
    }
}