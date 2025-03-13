# Employee Management System

An Employee Management System built with **Angular**, **RxJS**, and **JSON Server** to manage and interact with employee data. This system allows you to **add, update, delete**, and **view employee information**.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Description

This Employee Management System is designed to simplify the management of employee data. It uses **RxJS** for managing asynchronous data streams in Angular and **JSON Server** as a mock REST API to store and manipulate employee information. 

The system enables:

- Viewing the list of employees
- Adding new employees
- Updating existing employee details
- Deleting employees

The data is stored locally in **JSON Server**, and you can perform operations like filtering, adding, and deleting employees from the database.

## Features

- **View Employee List**: Display all employees with details such as name, job title, department, and salary.
- **Add Employee**: Add a new employee to the system with all required details.
- **Update Employee**: Modify details of an existing employee.
- **Delete Employee**: Remove an employee from the list.
- **Search and Filter**: Search employees by name or filter by department.
- **RxJS**: Utilized to handle asynchronous data streams for efficient UI updates.

## Technologies Used

- **Angular**: For building the frontend of the application and managing the user interface.
- **RxJS**: For handling asynchronous operations and stream-based data.
- **JSON Server**: A simple and fast REST API for development purposes, providing mock data.
- **Bootstrap**: For styling and responsive design.
- **TypeScript**: Strongly typed language for Angular development.
- **Node.js**: For running the local server and handling API requests.

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- Angular CLI
- JSON Server
json-server --watch employee.json
### Clone the repository

```bash
git clone https://github.com/yourusername/employee-management-system.git
cd employee-management-system
#Install dependencies
npm install
#Start the JSON Server
json-server --watch employee.json 
