
# Job Application Tracker

## Project Overview

The **Job Application Tracker** is a comprehensive MERN stack web application designed to manage job applications efficiently. It allows users to track their applications, update statuses, and visualize the data while providing administrative tools for user management. The application is built with a responsive and user-friendly interface, ensuring seamless usage across devices.

---

## Features

### User Features
- **Login/Signup**: Secure authentication with JWT.
- **Job Application Management**:
  - Create, update, and delete job applications.
  - Sort and filter applications by various criteria (e.g., date, status).
- **Data Visualization**: 
  - Pie chart representation of application statuses.
- **Multi-Tenant Architecture**:
  - Ensures data isolation for individual users.
- **State Management**:
  - ContextAPI for efficient data sharing.

### Admin Features
- **Admin Login**: Dedicated authentication for administrators.
- **Admin Dashboard**:
  - View and manage all user accounts.
  - Delete user accounts with a single action.

### Additional Features
- **Responsive Design**:
  - Optimized for mobile, tablet, and desktop screens.
- **Error Handling**:
  - Clear and interactive feedback on invalid actions.
- **Scalable Architecture**:
  - Built to handle a growing number of users and data.

---

## Project Structure

### Frontend
- Developed with **React.js** for a dynamic and responsive user interface.
- Integrated pie chart visualization using Chart.js or a similar library.

### Backend
- API services built with **Node.js** and **Express.js**.
- **MongoDB** as the database for storing user and job application data.

### Configuration
- Environment variables are stored in `.env` files to securely manage sensitive information.

---

## Steps to Set Up and Run the Application Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- Git installed on your system.

### Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Job-Application-Tracker
   ```

2. **Install Dependencies**
   - For the backend:
     ```bash
     cd job-tracker-backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../job-tracker-frontend
     npm install
     ```

3. **Set Up Environment Variables**
   - In the `job-tracker-backend` folder, create a `.env` file:
     ```env
     PORT=5000
     MONGO_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```
   - In the `job-tracker-frontend` folder, create a `.env` file:
     ```env
     REACT_APP_API_URL=http://localhost:5000
     ```

4. **Run the Application**
   - Start the backend server:
     ```bash
     cd job-tracker-backend
     npm start
     ```
   - Start the frontend client:
     ```bash
     cd ../job-tracker-frontend
     npm start
     ```

5. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`.

---

## Technologies Used
- **Frontend**: React.js, ContextAPI, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **State Management**: ContextAPI
- **Version Control**: Git & GitHub

---

## Missing Features (Optional Enhancements)
- **Role-Based Access Control (RBAC)**: Provide more granular access levels for users.
- **Email Notifications**: Send status updates to users via email.
- **Dark Mode**: Improve user experience with theme customization.
- **Export Data**: Allow users to export their application data to CSV/Excel.

---

Feel free to contribute or raise issues in the repository for further improvements. For any queries, contact the repository owner.
