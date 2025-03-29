# Student-Mentor API

This API is designed to manage student-mentor relationships efficiently. It provides endpoints for creating, retrieving, and updating student and mentor data, as well as handling assignments.

## Postman Documentation

You can view the interactive Postman API documentation here: https://documenter.getpostman.com/view/41735525/2sB2cPjkAJ

## API Endpoints

Here's a quick overview of the available endpoints:

**Mentors:**

* **`POST /api/mentors/create`**: Add a new mentor to the system.
* **`PATCH /api/mentors/:mentorId/students`**: Assign one or more students to a specific mentor.
* **`GET /api/mentors/:mentorId/students`**: Retrieve a list of students assigned to a particular mentor.
* **`GET /api/mentors`**: Get a list of all mentors.

**Students:**

* **`POST /api/students/create`**: Add a new student to the system.
* **`GET /api/students/withoutmentor`**: Retrieve a list of students who are currently not assigned to a mentor.
* **`GET /api/students/:studentId/mentor`**: Get the previously assigned mentor for a given student.
* **`PATCH /api/students/:studentId/assign`**: Assign a student to a mentor.
* **`GET /api/students`**: Get a list of all students.


