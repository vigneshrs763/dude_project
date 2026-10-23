CREATE DATABASE CampusCare;
USE CampusCare;

CREATE TABLE Departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    register_number VARCHAR(30) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    department_id INT,
    year_of_study INT,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id)
        REFERENCES Departments(department_id)
);

CREATE TABLE Staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    designation VARCHAR(80),
    department_id INT,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    FOREIGN KEY (department_id)
        REFERENCES Departments(department_id)
);

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(60) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Staff', 'Student') NOT NULL,
    student_id INT UNIQUE,
    staff_id INT UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id)
);

CREATE TABLE Facilities (
    facility_id INT AUTO_INCREMENT PRIMARY KEY,
    facility_name VARCHAR(100) NOT NULL,
    building VARCHAR(100) NOT NULL,
    room_number VARCHAR(30),
    facility_type ENUM(
        'Classroom', 'Laboratory', 'Hostel',
        'Office', 'Restroom', 'Other'
    ) DEFAULT 'Other',
    condition_status ENUM(
        'Good', 'Needs Repair', 'Under Maintenance'
    ) DEFAULT 'Good'
);

CREATE TABLE MaintenanceRequests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    category ENUM(
        'Electrical', 'Plumbing', 'Furniture',
        'Laboratory', 'Cleaning', 'Other'
    ) NOT NULL,
    priority ENUM('Low', 'Medium', 'High', 'Urgent')
        DEFAULT 'Medium',
    status ENUM(
        'Pending', 'In Progress', 'Resolved', 'Rejected'
    ) DEFAULT 'Pending',
    facility_id INT,
    reported_by INT NOT NULL,
    assigned_staff INT,
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (facility_id) REFERENCES Facilities(facility_id),
    FOREIGN KEY (reported_by) REFERENCES Users(user_id),
    FOREIGN KEY (assigned_staff) REFERENCES Staff(staff_id)
);

CREATE TABLE RequestHistory (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    updated_by INT NOT NULL,
    old_status VARCHAR(30),
    new_status VARCHAR(30) NOT NULL,
    remarks VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id)
        REFERENCES MaintenanceRequests(request_id),
    FOREIGN KEY (updated_by) REFERENCES Users(user_id)
);

INSERT INTO Departments (department_name) VALUES
('Computer Science'),
('Information Technology'),
('Electronics'),
('Mechanical Engineering'),
('Civil Engineering');

INSERT INTO Facilities
(facility_name, building, room_number, facility_type)
VALUES
('Computer Laboratory', 'Block A', 'A101', 'Laboratory'),
('Lecture Hall', 'Block B', 'B201', 'Classroom'),
('Boys Hostel', 'Hostel Block', 'H101', 'Hostel'),
('Library', 'Block C', 'C001', 'Other');

CREATE INDEX idx_request_status
ON MaintenanceRequests(status);

CREATE INDEX idx_request_date
ON MaintenanceRequests(reported_at);

SELECT * FROM Departments;
SELECT * FROM Students;
SELECT * FROM Staff;
SELECT * FROM Facilities;
SELECT * FROM MaintenanceRequests;
