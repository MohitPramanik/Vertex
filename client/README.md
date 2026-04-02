# Vertex - HR Management Portal

An Angular 21 HR management portal prototype for common people-ops workflows such as employee management, attendance tracking, leave handling, payroll views, recruitment, and company settings.

This project is currently a frontend-focused demo application. Several modules use seeded mock data, and some feature areas persist changes in `localStorage` so the UI remains interactive across refreshes without a backend.

## Features

- Dashboard with role-based summary cards and activity sections
- Employee directory with filter controls and export/add action placeholders
- Attendance calendar, timesheet entry modal, and attendance records
- Leave application, leave requests, and leave balance tracking
- Payslips and salary structure management
- Recruitment screens for jobs and candidates
- Department management and reports pages
- Profile, notifications, company settings, and security/general settings
- Authentication-related pages for login, signup, and password reset

## Tech Stack

- Angular 21 with standalone components
- Angular Router
- Angular Signals for UI and store state
- SCSS for styling
- Tailwind CSS v4 utilities in global styles
- Vitest via Angular's unit test builder

## Project Status

The app is best described as a UI prototype or frontend starter for an HR platform.

- Some pages are static or partially interactive
- Attendance, leave, salary structure, and company settings include local state stores
- Data persistence is browser-based only and uses `localStorage`
- There is no API or authentication backend wired into the project yet

## Getting Started

### Prerequisites

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm start
```

The dev server runs at `http://localhost:4200/`.

## Available Scripts

```bash
npm start      # Start Angular dev server
npm run build  # Create a production build in dist/
npm run watch  # Build in watch mode using development configuration
npm test       # Run unit tests
```

## Main Routes

- `/dashboard`
- `/employees`
- `/attendance`
- `/attendance/records`
- `/leave/apply`
- `/leave/requests`
- `/leave/balance`
- `/payslips`
- `/salary-structure`
- `/holiday-list`
- `/recruitment/jobs`
- `/recruitment/candidates`
- `/departments`
- `/reports`
- `/company-setting`
- `/settings`
- `/settings/security`
- `/profile`
- `/notifications`
- `/login`
- `/signup`
- `/password/reset`

## Local Persistence

The following feature areas currently save data to browser `localStorage`:

- Attendance entries
- Leave requests and leave balances
- Salary structure
- Company settings

If you want a clean demo state, clear site storage in your browser and reload the app.

## Build Output

Production builds are generated in the `dist/` directory.

## Future Improvements

- Connect the UI to a real API and database
- Add authentication and role-based access control
- Replace hard-coded lists with server-backed data
- Expand automated test coverage
- Add end-to-end testing
