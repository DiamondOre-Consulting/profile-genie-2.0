# Profile-Genie 2.0 - Server Documentation

## Table of Contents
- [Profile-Genie 2.0 - Server Documentation](#profile-genie-20---server-documentation)
  - [Table of Contents](#table-of-contents)
  - [About ](#about-)
  - [Getting Started ](#getting-started-)
    - [Prerequisites ](#prerequisites-)
    - [Installing ](#installing-)
  - [Usage ](#usage-)
  - [Folder Structure ](#folder-structure-)
  - [Server Overview ](#server-overview-)
    - [Root Files \& Configuration ](#root-files--configuration-)
    - [Controllers ](#controllers-)
    - [Middleware ](#middleware-)
    - [Models ](#models-)
    - [Routes ](#routes-)
    - [Authentication \& Authorization ](#authentication--authorization-)
    - [Utilities ](#utilities-)
    - [Uploads Directory ](#uploads-directory-)
  - [Conclusion](#conclusion)

## About <a name = "about"></a>
Profile-Genie 2.0 is a powerful portfolio management system that enables users to create and showcase their profiles online. The backend is built using **Node.js**, **Express.js**, and **MongoDB**, ensuring scalability and efficiency. It features **user authentication, portfolio management, file uploads, and metadata storage** while integrating **OAuth authentication** with Google and Facebook.

## Getting Started <a name = "getting_started"></a>
These instructions will help you set up the project on your local machine for development and testing. See [deployment](#deployment) for instructions on deploying the project to a live server.

### Prerequisites <a name = "prerequisites"></a>
Ensure you have the following installed:

- **Node.js** (Latest LTS version)
- **MongoDB** (Locally installed or a cloud-based MongoDB Atlas instance)
- **NPM or Yarn** (For package management)

Install them using:
```
# Install Node.js & NPM
https://nodejs.org/en/download/

# Install MongoDB (if running locally)
https://www.mongodb.com/try/download/community
```

### Installing <a name = "installing"></a>
Follow these steps to set up the development environment:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/profile-genie.git
   ```
2. Navigate to the project directory:
   ```sh
   cd profile-genie/server
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file based on `.env.example` and configure the required variables.
5. Start the development server:
   ```sh
   npm run dev
   ```
6. The server will start on `http://localhost:5000` by default.

## Usage <a name = "usage"></a>
After setup, you can interact with the API using tools like **Postman** or **cURL**. The main functionalities include:

- **User Authentication** (Sign Up, Login, OAuth via Google/Facebook)
- **Portfolio Management** (Create, Read, Update, Delete)
- **File Uploads** (Images, Documents)
- **User Metadata Handling**

## Folder Structure <a name = "folder_structure"></a>
```
server/
├─ .env
├─ .env.example.js
├─ .gitignore
├─ app.js
├─ config/
│  └─ db.config.js
├─ controller/
│  ├─ auth.controller.js
│  ├─ metaData.controller.js
│  └─ portfolio.controller.js
├─ middleware/
│  ├─ auth.middleware.js
│  ├─ error.middleware.js
│  └─ multer.middleware.js
├─ model/
│  ├─ auth.model.js
│  └─ portfolioModel/
│     ├─ metaData.model.js
│     ├─ portfolio.model.js
│     ├─ portfolioContact.model.js
│     └─ portfolioDetail.model.js
├─ package-lock.json
├─ package.json
├─ passport/
│  └─ passport.js
├─ routes/
│  ├─ auth.routes.js
│  └─ portfolio.routes.js
├─ server.js
├─ uploads/
│  ├─ 16da3ae6-9.png
│  ├─ 19d723e2-3.png
│  ├─ 6ca835a2-a.png
│  ├─ 784facc2-8.png
│  ├─ d9b50827-d.png
│  ├─ f6f8712e-0.png
│  ├─ fcd167d2-0.png
│  └─ Heavy_Grey_Metallic_new9.png
└─ utils/
   ├─ asyncHandler.js
   ├─ error.utils.js
   ├─ fileUpload.utils.js
   └─ mail.utils.js


```

## Server Overview <a name = "server_overview"></a>

### Root Files & Configuration <a name = "root_files_configuration"></a>
- **`server.js`**: The entry point that initializes Express and connects to MongoDB.
- **`app.js`**: Sets up Express middleware and API routes.
- **`.env`**: Stores environment variables like database credentials and JWT secrets.
- **`config/db.config.js`**: Handles database connection.

### Controllers <a name = "controllers"></a>
- **`auth.controller.js`**: Manages user registration, login, OAuth authentication, and password recovery.
- **`portfolio.controller.js`**: Handles portfolio creation, updates, and retrieval.
- **`metaData.controller.js`**: Manages metadata for portfolios.

### Middleware <a name = "middleware"></a>
- **`auth.middleware.js`**: Protects routes with JWT authentication.
- **`error.middleware.js`**: Handles errors globally.
- **`multer.middleware.js`**: Manages file uploads using Multer.

### Models <a name = "models"></a>
- **`auth.model.js`**: Defines the user schema (name, email, password, OAuth data).
- **`portfolio.model.js`**: Stores portfolio data (title, description, images, metadata).
- **`portfolioContact.model.js`**: Stores contact details related to portfolios.
- **`portfolioDetail.model.js`**: Stores additional portfolio descriptions and pricing details.

### Routes <a name = "routes"></a>
- **`auth.routes.js`**:
  - `POST /register`: User registration
  - `POST /login`: User login
  - `POST /google-login`: Google OAuth login
  - `POST /forgot-password`: Sends password reset email
  - `POST /reset-password`: Resets user password

- **`portfolio.routes.js`**:
  - `POST /add`: Create a new portfolio
  - `GET /all`: Retrieve all portfolios
  - `GET /:id`: Get portfolio by ID
  - `PUT /update/:id`: Update portfolio details
  - `DELETE /delete/:id`: Delete portfolio
  - `POST /upload`: Handle file uploads

### Authentication & Authorization <a name = "authentication_authorization"></a>
- Uses **JWT-based authentication** for secure access.
- Supports **OAuth login** via Google & Facebook.
- Implements **role-based access control (RBAC)**.

### Utilities <a name = "utilities"></a>
- **`asyncHandler.js`**: Wraps async functions for error handling.
- **`error.utils.js`**: Custom error-handling classes.
- **`fileUpload.utils.js`**: Manages file uploads and Cloudinary integration.
- **`mail.utils.js`**: Handles email notifications via Nodemailer.

### Uploads Directory <a name = "uploads_directory"></a>
- Stores uploaded portfolio images and documents.
- Uses **UUID-based naming** to prevent conflicts.

## Conclusion
The backend of Profile-Genie 2.0 is built for **scalability, security, and efficiency**. It provides a robust API for managing portfolios, authentication, and file uploads, making it a comprehensive system for users to showcase their work.

