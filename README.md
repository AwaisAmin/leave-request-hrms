# Leave Request Functionality – Technical Documentation

## Overview of Your Solution
This project implements a Leave Request feature for an HRMS module using a modern full-stack approach:
- **Frontend:** React (TypeScript) with Ant Design, organized in a modular structure.
- **Backend:** Node.js (TypeScript, Express), with modular routing and in-memory mock data.
- The UI is responsive and user-friendly, with a sticky form on the left and leave history on the right for desktop, and a stacked layout for mobile.
- All data is handled in-memory for demo purposes; no persistent storage is used.

## Component Structure
- **App.tsx**: Main entry point, manages state, data fetching, and layout.
- **components/LeaveBalance.tsx**: Displays the user's current leave balances (annual, sick, casual).
- **components/LeaveRequestForm.tsx**: Handles the leave request form, validation, and submission.
- **components/LeaveHistory.tsx**: Shows a card-based history of leave requests with status, dates, and notes.
- **types/Leave.ts**: Centralized TypeScript interfaces for leave data and requests.

## Data Flow Summary
- **Frontend:**
  - Fetches leave balance and history from backend endpoints (`/leave-balance`, `/leave-history`).
  - Submits leave requests to `/leave-request` with form data (category, dates, type, notes).
  - Updates UI state and shows toast notifications for all actions.
- **Backend:**
  - Uses in-memory objects for leave balances and request history.
  - Deducts leave from the selected category and stores each request in an array.
  - Returns updated balances and history on each relevant API call.

## Functional Requirements Coverage
- [x] Leave balance display (mock data)
- [x] Leave request form with:
  - Date selection (range or single-day)
  - Leave type (half-day/full-day)
  - Leave category (annual/sick/casual)
  - Optional notes
- [x] Submit button with validation and confirmation (toast) message
- [x] Leave request history/status listing
- [x] Responsive, mobile-friendly UI
- [x] Use of Ant Design components
- [x] Reusable, maintainable component structure

## Known Limitations
- No authentication or user management
- No persistent storage (all data is lost on backend restart)
- No advanced validation (e.g., overlapping dates, leave balance checks across categories)
- No leave request editing or cancellation
- Not production-hardened (for demo/prototype use only)
- No unit/integration tests beyond a basic render test

---

**How to Run:**
1. Start backend: `cd backend && yarn start`
2. Start frontend: `cd frontend && yarn start`

Open [http://localhost:3000](http://localhost:3000) in your browser. 
