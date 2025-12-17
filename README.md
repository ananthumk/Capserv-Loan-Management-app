# Loan Management Application

A modern, responsive loan management system built with React and Vite. This application helps manage customer loans with features for viewing, filtering, and managing user profiles.

## Features

### Core Features
- **Dashboard** - View and manage all loans with advanced filtering
- **User Authentication** - Secure login and signup system
- **User Profiles** - Manage personal information and settings
- **Responsive Design** - Fully mobile-optimized interface
- **Theme Support** - Light/Dark mode toggle
- **Real-time Data Management** - LocalStorage persistence

### 📱 Mobile Optimization
- Responsive Navbar with menu dropdown on mobile
- Mobile-friendly sidebar that hides on small screens
- Touch-optimized buttons and interactions
- Adaptive layout for all screen sizes

### Authentication
- Login page with email validation
- Signup with full name, email, phone, and password
- Protected routes for authenticated users
- Secure logout functionality

### Loan Management
- View all loans in a responsive table
- Filter by customer name
- Filter by loan status (Approved, Pending, Rejected, In Review)
- Filter by loan type
- Real-time search functionality

### User Profile
- View personal information (name, email, phone)
- Edit profile details
- Active user status indicator
- Account management

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 5.1.4
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: react-router-dom 7.10.1
- **Icons**: lucide-react
- **Notifications**: react-hot-toast
- **State Management**: React Context API

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Button.jsx          # Reusable button component
│   │   ├── InputField.jsx      # Reusable input field
│   │   ├── LoanTable.jsx       # Loan table display
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── ProtectedRoute.jsx  # Route protection wrapper
│   │   └── Sidebar.jsx         # Side navigation
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication state management
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main dashboard with loans
│   │   ├── Login.jsx           # Login page
│   │   ├── Profile.jsx         # User profile page
│   │   └── Signup.jsx          # User registration page
│   ├── data/
│   │   ├── mockData.js         # Sample data
│   ├── utils/
│   │   └── storage.js          # LocalStorage utilities
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/                      # Static assets
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Authentication

### Login
- Use the sample credentials or create a new account
- Credentials are stored securely in localStorage
- Sessions persist across browser reloads

### Signup
- Enter full name, email, phone number, and password
- Passwords are stored securely
- Automatic login after successful signup

## Features Details

### Dashboard
- Search loans by customer name
- Filter by loan status
- Filter by loan type
- View loan details in an organized table
- Real-time filtering

### Profile Management
- View personal information
- Edit profile details
- Update phone number and name
- Logout option

### Responsive Design
- **Mobile (<640px)**: Hamburger menu, icon-only buttons, optimized spacing
- **Tablet (640px-1024px)**: Full navigation, adaptive layouts
- **Desktop (>1024px)**: Full features, sidebar navigation, complete UI

### Theme System
- Light mode and dark mode support
- Theme toggle in Navbar
- Persistent theme preference
- Smooth transitions between themes

## Data Management

### LocalStorage Structure
- `currentUser` - user data and loan data details

### Sample Data
The application comes with pre-loaded sample data including:
- Sample users with different loan records
- Various loan statuses (Approved, Pending, Rejected)
- Different loan types

## Security

- Protected routes require authentication
- Logout clears user session
- LocalStorage for persistence (in production)
- Input validation on forms


## Performance

- Optimized with Vite for fast development and builds
- Code splitting for efficient load times
- Responsive images and lazy loading
- Efficient state management with React Context


## License

This project is part of the Capserv Loan Management Application.

## Support

For issues or questions, please contact the development team.

