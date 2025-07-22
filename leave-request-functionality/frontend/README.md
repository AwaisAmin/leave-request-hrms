# Leave Request Functionality – Technical Documentation

## Overview
This project is a functional prototype for an HRMS Leave Request module, built with React (TypeScript) and Ant Design for the frontend, and Node.js (TypeScript, Express) for the backend. It demonstrates a clean, user-focused leave request flow with mock data and basic validation.

## Component Structure
- **App.tsx**: Main component. Displays leave balance and the leave request form.
  - **Leave Balance Display**: Shows mock leave balances (annual, sick, casual).
  - **Leave Request Form**: Uses Ant Design's Form, DatePicker, Select, and Input components for user input.

## Data Flow Summary
- **Frontend**:
  - Fetches leave balance from the backend (`/leave-balance` endpoint) on load.
  - Submits leave requests to the backend (`/leave-request` endpoint) with form data.
  - Displays confirmation messages based on backend response.
- **Backend**:
  - Serves mock leave balance data.
  - Accepts leave request submissions, performs basic validation, and returns success/failure.
  - All data is in-memory; no database or persistent storage is used.

## Functional Requirements Coverage
- [x] Leave balance display (mock data)
- [x] Leave request form with date selection, leave type, and optional notes
- [x] Submit button with validation and confirmation message
- [x] Responsive, mobile-friendly UI
- [x] Use of Ant Design components
- [x] Reusable, maintainable component structure

## Known Limitations
- No authentication or user management
- No persistent storage (all data is mock/in-memory)
- No advanced validation (e.g., overlapping dates, leave balance checks)
- No leave request history or status tracking
- Not production-hardened (for demo/prototype use only)

---

**How to Run:**
1. Start backend: `cd backend && yarn start`
2. Start frontend: `cd frontend && yarn start`

Open [http://localhost:3000](http://localhost:3000) in your browser.
