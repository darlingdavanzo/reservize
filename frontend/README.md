# Reservize Frontend - Reservation Web Application for Restaurants and Bars

**Reservize** is a sleek, modern frontend built for a reservation system designed specifically for the food and beverage industry. This user-friendly application enables restaurants and bars to offer an easy-to-use, responsive interface for customers to book reservations.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [License](#license)

## Features

- **Reservation Interface**: Users can select the number of guests, choose the date, and select from available time slots for reservations.
- **Fully Responsive Design**: Built using Tailwind CSS to ensure a seamless experience on desktop, tablet, and mobile.
- **Step-by-Step Process**: Users are guided through a simple, multi-step reservation process, from selecting guests to confirming their booking.
- **Validation**: Integrated form validation to ensure that all required fields are filled before proceeding to the next step.
- **Calendar Component**: Custom calendar component that highlights available and fully booked dates.
- **Time Slot Selection**: Time slots are dynamically updated based on the selected date.
- **Aesthetic Consistency**: Disabled time slots and dates are shown but non-selectable to ensure a clean and consistent UI.

## Technology Stack

- **Frontend Framework**: React.js (with Hooks)
- **CSS Framework**: Tailwind CSS
- **State Management**: React's useState and useEffect hooks
- **Calendar and Time Selection**: Custom-built components

## Getting Started

### Prerequisites

Before starting the project, make sure you have the following tools installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/reservize-frontend.git
   cd reservize-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   or, if you prefer Yarn:

   ```bash
   yarn install
   ```

### Running Locally

To start the project in development mode:

```bash
npm start
```

or, if using Yarn:

```bash
yarn start
```

The frontend will be available at `http://localhost:3000`.

## Project Structure

```bash
reservize-frontend/
│
├── public/                     # Public assets and HTML template
├── src/                        # Source code for the React frontend
│   ├── components/             # React components (Calendar, SuccessMessage, etc.)
│   ├── pages/                  # Main pages (e.g., ReservationPage)
│   ├── hooks/                  # Custom hooks (if any)
│   ├── App.js                  # Main application entry point
│   ├── index.js                # ReactDOM rendering
│   └── styles/                 # Global and component-specific styles
├── .gitignore                  # Files to ignore in Git
├── package.json                # npm/yarn dependencies and scripts
├── README.md                   # Project readme file
└── tailwind.config.js          # Tailwind CSS configuration
```

## Deployment

To deploy this frontend application, follow these steps:

1. **Build the project** for production:

   ```bash
   npm run build
   ```

   This will create an optimized production build in the `build/` folder.

2. **Deploy**:

   - You can deploy the generated `build/` folder to any static site hosting service, such as:
     - [Netlify](https://www.netlify.com/)
     - [Vercel](https://vercel.com/)
     - [GitHub Pages](https://pages.github.com/)
     - [AWS S3](https://aws.amazon.com/s3/) (with CloudFront for CDN)
   - Most of these services support CI/CD pipelines, so you can automatically deploy changes from the `main` branch.

## License

This project is licensed under the MIT License.