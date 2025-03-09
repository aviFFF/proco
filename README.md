# ProCo - Professional Computer Institute

A web application for a computer institute offering skill-based courses with a student inquiry form that stores data in MongoDB.

## Features

- Single-page application with toggle functionality
- Responsive design for all devices
- Course catalog with detailed information
- Contact form with validation
- MongoDB integration for storing inquiries
- Hero section with engaging content
- Individual course sections for each offering
- Achievements and teacher information sections
- Admin dashboard for managing inquiries and courses
- Real-time notifications for new inquiries
- Inquiry status management (New, Pending, Completed)

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Real-time**: Server-Sent Events (SSE)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd proco
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string if needed

## Running the Application

### Development Mode (Frontend Only)

1. Start the Next.js frontend:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

### Development Mode (Backend Only)

1. Start the Express backend:
   ```
   npm run dev:server
   ```

2. The API will be available at `http://localhost:5000`

### Development Mode (Full Stack)

1. Start both frontend and backend concurrently:
   ```
   npm run dev:all
   ```

2. Open your browser and navigate to `http://localhost:3000`

### Production Mode

1. Build the Next.js frontend:
   ```
   npm run build
   ```

2. Start the production server:
   ```
   npm start
   ```

3. Start the Express backend:
   ```
   npm run server
   ```

## Project Structure

- `/src` - Next.js frontend code
  - `/app` - Next.js app router
  - `/components` - React components
  - `/components/admin` - Admin dashboard components
- `/backend` - Express.js backend code
  - `/models` - MongoDB models
  - `server.js` - Main server file
- `/public` - Static assets

## Available Courses

- JavaScript Development
- Android App Development
- MERN Stack Development
- Software Testing
- Graphic Designing
- AI-Powered Development

## Form Submission

The contact form has two modes:

1. **Demo Mode (Default)**: Form submissions are stored in-memory when MongoDB is not connected.
2. **MongoDB Mode**: When MongoDB is connected, form submissions are stored in the database.

## Admin Dashboard

The application includes an admin dashboard to manage student inquiries and view courses:

1. **Access**: Navigate to `/admin` or click the Admin link in the footer
2. **Authentication**: Use the demo password "admin123" to log in
3. **Features**:
   - View and manage student inquiries
   - Update inquiry status (New, Pending, Completed)
   - View course information
   - Real-time notifications for new inquiries
   - MongoDB connection status indicator

## Notifications

The admin dashboard includes a notification system:

1. **Real-time Updates**: Receive instant notifications when new inquiries are submitted
2. **Browser Notifications**: Get desktop notifications (requires permission)
3. **Status Updates**: Notifications when inquiry status changes
4. **Notification Center**: View all notifications in one place

## API Status Indicator

The application includes an API status indicator in the bottom-right corner:
- 🟢 Green: API is online
- 🔴 Red: API is offline
- 🟡 Yellow: Checking API status

Hover over the indicator to see more details about the MongoDB connection status.

## License

MIT
