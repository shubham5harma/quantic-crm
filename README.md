A Mini-CRM backend API built with Node.js, Express, TypeScript, MongoDB (Mongoose), and JWT authentication.

It provides APIs to manage:
 User Authentication (Signup, Login)
 Leads Management
 Accounts Management
 Activities Management (calls, emails, meetings, tasks)

Features
 Authentication & Authorization with JWT
 Role-based access control (rep, admin, manager)
 CRUD APIs for Leads, Accounts, and Activities
 Secure API with Helmet, Rate Limiting, and CORS
 Environment-based Config (dotenv, NODE_ENV)
 MongoDB Atlas support



1. Installation & Setup
git clone https://github.com/shubham5harma/quantic-crm.git
cd mini-crm

2. Install Dependencies
npm install

3. Setup Environment Variables
Create a .env file in the project root:

4. Run the Server (Development)
npm run dev

Server will run at:
http://localhost:4000