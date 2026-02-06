
# GoGaGa Dashboard

A modern flight booking and travel package management dashboard built with React. This application provides users with an intuitive interface to search, browse, and manage flight bookings and travel packages.

## Features

- **Flight Search & Browsing**: Search and filter available flights with comprehensive flight cards
- **Travel Packages**: Browse travel packages with and without flight options
- **User Authentication**: Secure login and signup functionality with context-based auth management
- **Booking Management**: Manage bookings through dedicated context providers
- **Responsive Design**: Clean, modern UI with sidebar navigation and header components
- **Interactive Components**: Rich UI elements powered by Lucide React icons

## Tech Stack

- **Frontend Framework**: React 19.2.4
- **Routing**: React Router v7.13.0
- **Icons**: Lucide React v0.563.0
- **Styling**: CSS
- **Build Tool**: Create React App with React Scripts 5.0.1
- **Testing**: Jest with React Testing Library

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FlightCard.js   # Flight display component
│   ├── Header.js       # Application header
│   ├── SearchForm.js   # Flight search interface
│   └── Sidebar.js      # Navigation sidebar
├── pages/              # Page components
│   ├── Dashboard.js    # Main dashboard
│   ├── Login.js        # Login page
│   ├── Signup.js       # Registration page
│   └── PackageWithoutFlight.js  # Travel packages
├── context/            # React context providers
│   ├── AuthContext.js      # Authentication context
│   └── BookingContext.js   # Booking management context
├── data/               # Static data
│   └── flightData.json
├── assets/             # Images and static files
└── App.js              # Main application component
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd gogaga-dashboard
```

2. Install dependencies
```bash
npm install
```

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

#### `npm test`

Launches the test runner in interactive watch mode.\
See the [Create React App documentation](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Context Providers

### AuthContext
Manages user authentication state including login, signup, and session management.

### BookingContext
Handles flight and package booking information and state management.

## Component Overview

- **Header**: Navigation and branding component
- **Sidebar**: Navigation menu for different sections
- **SearchForm**: Flight search interface with filters
- **FlightCard**: Displays individual flight information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)

## Deployment

The application is ready to be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

Build the project and deploy the `build` folder:
```bash
npm run build
```


