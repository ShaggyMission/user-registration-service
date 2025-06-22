# 🐕 User Registration Service - Shaggy Mission

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" 
  alt="MySQL" />

</div>

<div align="center">
  <h3>🚀 Secure User Registration Microservice for Pet Rescue Platform</h3>
  <p><em>Part of the Shaggy Mission ecosystem - Saving street dogs and cats, one registration at a time! 🐾</em></p>
</div>

---

## 🌟 Overview

The **User Registration Service** is a critical microservice in the Shaggy Mission platform that handles secure user onboarding for pet rescue volunteers, adopters, and contributors. This service ensures that every hero joining our mission to save street animals has a secure and seamless registration experience.

## 🎯 What This Service Does

- **Secure User Registration**: Creates new user accounts with encrypted passwords using bcrypt hashing
- **Email Validation**: Prevents duplicate registrations and validates email formats  
- **Automatic Role Assignment**: Integrates with Role Service to assign default "Contributor" role to new users
- **Transaction Safety**: Ensures data consistency with database transactions and rollback on errors
- **Unique User Identification**: Generates secure user IDs using nanoid for enhanced security

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express.js framework
- **Database**: MySQL with Sequelize ORM
- **Security**: bcrypt for password hashing (10 salt rounds)
- **Documentation**: Swagger UI integration
- **Service Communication**: Axios for inter-service communication
- **ID Generation**: nanoid for unique user identifiers

## 📡 API Endpoints

### User Registration Endpoint
**`POST /user/register`**
- Creates new user accounts for the Shaggy Mission platform
- Validates all required user information
- Encrypts passwords before storage
- Automatically assigns "Contributor" role via Role Service integration
- Returns unique user ID upon successful registration

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "password": "securePassword123",
  "phone": "+1234567890"
}
```

### API Documentation Endpoint  
**`GET /user/register-docs`**
- Interactive Swagger UI documentation
- Complete API specification and testing interface

```json
{
  "swagger": "2.0",
  "info": {
    "title": "User Registration API",
    "version": "1.0.0"
  }
}
```

## 🔧 Core Functionality

### Registration Process
The service handles the complete user onboarding workflow by validating user input, checking for existing accounts, securely hashing passwords, creating user records with unique identifiers, and automatically assigning default roles through service integration. All operations are wrapped in database transactions to ensure data consistency and automatic rollback on any failures.

### Security Features
- **Password Protection**: Uses bcrypt with 10 salt rounds for secure password storage
- **Email Uniqueness**: Prevents duplicate account creation
- **Input Validation**: Comprehensive validation for all user fields including email format verification
- **Transaction Integrity**: Database transactions ensure atomic operations

### Database Schema
The service manages a Users table with fields for unique string ID (generated with nanoid), first name, last name, email (unique and validated), hashed password, and phone number. All fields except the auto-generated ID are required.

## 🌐 Service Integration

This microservice integrates with the Role Service to automatically assign the "Contributor" role to newly registered users, ensuring proper access control within the Shaggy Mission platform ecosystem.

---

<div align="center">
  <p><strong>Built with ❤️ for street dogs and cats everywhere 🐕🐱</strong></p>
  <p><em>Every registration brings us closer to saving more lives!</em></p>
</div>