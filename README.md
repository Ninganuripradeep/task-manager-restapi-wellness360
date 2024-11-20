# Task Management API

This repository is a Task Management API that supports user registration, login, task creation, updating, deletion, and status management. It also implements JWT-based user authentication to secure endpoints.

## Table of Contents

- [Features](#features)
- [Tools and Technologies](#tools-and-technologies)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Unit Tests](#unit-tests)

## Features

### User-side features
- Signup
- Login
- Task Management (Create, Read, Update, Delete)
- Task Status Updates

### Developer-side features
- JWT Authentication for protected routes
- Task filtering and sorting
- Relevant redirects
- Custom error handling
- Use of various HTTP status codes for responses
- Standard practices followed

## Tools and Technologies

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)

## Installation

1. **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2. **Install dependencies:**
    Make sure you have Node.js installed. Then run:
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root of the project and add your JWT secret key and other necessary configurations:
    ```bash
    JWT_SECRET=<your-secret-key>
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/taskdb
    ```

---

## Running the Application

1. **Start the server:**
    ```bash
    npm start
    ```

    By default, the application will run on `http://localhost:5000`.

---

## API Endpoints

### **1. Register User**
- **Endpoint**: `/api/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
    ```json
    {
      "username": "user123",
      "password": "password123"
    }
    ```

---

### **2. Login User**
- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Logs in an existing user and returns a JWT token.
- **Request Body**:
    ```json
    {
      "username": "user123",
      "password": "password123"
    }
    ```

---

### **3. Fetch All Tasks**
- **Endpoint**: `/api/tasks`
- **Method**: `GET`
- **Description**: Fetches all tasks with optional filters and sorting.
- **Query Parameters**:
    - `due_date`: Filter tasks by a specific due date (format: `YYYY-MM-DD`).
    - `status`: Filter tasks by status (e.g., `in_progress`, `completed`, `pending`).
    - `sort`: Sort tasks by due date. Possible values: `asc` (ascending) or `desc` (descending).
- **Example Request**:
    ```http
    GET /api/tasks
    ```
- **Response**:
    ```json
    {
      "status": "success",
      "message": "Tasks fetched successfully!",
      "data": [{/* task objects */}]
    }
    ```

---

### **4. Fetch a Specific Task**
- **Endpoint**: `/api/tasks/:taskId`
- **Method**: `GET`
- **Description**: Fetches a specific task by ID.
- **Example Request**:
    ```http
    GET /api/tasks/12345
    ```
- **Response**:
    ```json
    {
      "status": "success",
      "message": "Task fetched successfully!",
      "data": {/* task object */}
    }
    ```

---

### **5. Create a New Task**
- **Endpoint**: `/api/tasks`
- **Method**: `POST`
- **Description**: Creates a new task with title, description, and due_date.
- **Request Body**:
    ```json
    {
      "title": "Task Title",
      "description": "Task Description",
      "due_date": "2024-12-31"
    }
    ```
- **Response**:
    ```json
    {
      "status": "success",
      "message": "Task created successfully!",
      "data": {/* new task object */}
    }
    ```

---

### **6. Update a Task**
- **Endpoint**: `/api/tasks/:taskId`
- **Method**: `PUT`
- **Description**: Updates a task with new values for title, description, or due_date.
- **Request Body**:
    ```json
    {
      "title": "Updated Title",
      "description": "Updated Description",
      "due_date": "2024-12-30"
    }
    ```
- **Response**:
    ```json
    {
      "status": "success",
      "message": "Task updated successfully!",
      "data": {/* updated task object */}
    }
    ```

---

### **7. Delete a Task**
- **Endpoint**: `/api/tasks/:taskId`
- **Method**: `DELETE`
- **Description**: Deletes a task by ID.
- **Response**:
    ```json
    {
      "status": "success",
      "message": "Task deleted successfully!",
      "data": null
    }
    ```

---

### **8. Update Task Status**
- **Endpoint**: `/api/tasks/:taskId/status`
- **Method**: `PATCH`
- **Description**: Updates the status of a task (`pending`, `in_progress`, `completed`).
- **Request Body**:
    ```json
    {
      "status": "in_progress"
    }
    ```
- **Response**:
    ```json
    {
      "status": "success",
      "message": "Task status updated to in_progress",
      "data": {/* updated task object */}
    }
    ```

---

### **9. Task Management with Filters**
- **Endpoint**: `/api/tasks`
- **Method**: `GET`
- **Description**: Fetches a list of tasks with optional filters.

#### **Query Parameters**:
- `status`: Filter tasks by their status (e.g., `in_progress`, `completed`).
- `due_date`: Filter tasks by a specific due date (format: `YYYY-MM-DD`).
- `sort`: Sort tasks by due date. Possible values: `asc` (ascending) or `desc` (descending).

#### **Example Requests**:
- **To get all tasks sorted by due_date in ascending order**:
    ```http
    GET /api/tasks?sort=asc
    ```
- **To get tasks filtered by status and sorted by due_date in ascending order**:
    ```http
    GET /api/tasks?status=in_progress&sort=asc
    ```

---

## Unit Tests

### User Login Unit Test
- **Test Framework**: Jest
- **Description**: A unit test is implemented to ensure that the user login functionality works correctly. It tests the login process, including verifying the correct generation of a JWT token upon successful authentication.
  
- **Running the Tests**:
    To run the tests, use the following command:
    ```bash
    npm test
    ```

    Jest will execute the test cases and provide feedback on the results.

---
