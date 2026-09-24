package com.portfolio.employee_management_api.dto;

import java.util.List;

public class DashboardResponse {

    private long totalEmployees;
    private long activeEmployees;
    private long inactiveEmployees;
    private long totalDepartments;

    private List<DepartmentStat> departmentStats;
    private List<RecentEmployee> recentEmployees;

    public DashboardResponse(
            long totalEmployees,
            long activeEmployees,
            long inactiveEmployees,
            long totalDepartments,
            List<DepartmentStat> departmentStats,
            List<RecentEmployee> recentEmployees) {

        this.totalEmployees = totalEmployees;
        this.activeEmployees = activeEmployees;
        this.inactiveEmployees = inactiveEmployees;
        this.totalDepartments = totalDepartments;
        this.departmentStats = departmentStats;
        this.recentEmployees = recentEmployees;
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public long getActiveEmployees() {
        return activeEmployees;
    }

    public long getInactiveEmployees() {
        return inactiveEmployees;
    }

    public long getTotalDepartments() {
        return totalDepartments;
    }

    public List<DepartmentStat> getDepartmentStats() {
        return departmentStats;
    }

    public List<RecentEmployee> getRecentEmployees() {
        return recentEmployees;
    }

    public static class DepartmentStat {

        private String department;
        private long count;

        public DepartmentStat(String department, long count) {
            this.department = department;
            this.count = count;
        }

        public String getDepartment() {
            return department;
        }

        public long getCount() {
            return count;
        }
    }

    public static class RecentEmployee {

        private Long id;
        private String firstName;
        private String lastName;
        private String department;
        private String status;
        private String joiningDate;

        public RecentEmployee(
                Long id,
                String firstName,
                String lastName,
                String department,
                String status,
                String joiningDate) {

            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.department = department;
            this.status = status;
            this.joiningDate = joiningDate;
        }

        public Long getId() {
            return id;
        }

        public String getFirstName() {
            return firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public String getDepartment() {
            return department;
        }

        public String getStatus() {
            return status;
        }

        public String getJoiningDate() {
            return joiningDate;
        }
    }
}