# Student Management System — Frontend

Frontend application for a student management system designed for a music coaching institute. The application provides an interface for managing student information and tracking fee payments.

## Overview

The frontend is built with React and TypeScript and communicates with a Node.js/Express backend through REST APIs.

**Backend:** https://github.com/pramodryadav/student-mgmt-backend

## Tech Stack

- React
- TypeScript
- Material UI
- Axios
- Formik
- Yup
- React Router
- Day.js
- React Toastify
- XLSX

## Features

- Student management interface
- Fee/payment tracking
- Form-based student and payment management
- Client-side form validation
- REST API integration
- Application routing
- Date handling
- Toast notifications
- Spreadsheet data handling
- Responsive Material UI components

## Project Structure

```text
student-mgmt-front-end/
├── public/
├── src/
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/pramodryadav/student-mgmt-front-end.git
cd student-mgmt-front-end
```

Install dependencies:

```bash
npm install
```

### Run the Application

Start the development server:

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

### Production Build

Create a production build:

```bash
npm run build
```

The optimized production files will be generated in the `build` directory.

## Backend

This application requires the Student Management backend API.

Backend repository:

https://github.com/pramodryadav/student-mgmt-backend

Make sure the backend is configured and running before using features that require API access.

## License

This project is for educational and portfolio purposes.
