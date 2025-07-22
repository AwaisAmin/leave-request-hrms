import express from 'express';

const router = express.Router();

// Mock leave balance data
const mockLeaveBalance = {
  annual: 12,
  sick: 8,
  casual: 5,
};

// In-memory leave requests
let leaveRequests: any[] = [];

// GET /leave-balance
router.get('/leave-balance', (req, res) => {
  res.json({ success: true, data: mockLeaveBalance });
});

// GET /leave-history
router.get('/leave-history', (req, res) => {
  res.json({ success: true, data: leaveRequests });
});

// POST /leave-request
router.post('/leave-request', (req, res) => {
  const { startDate, endDate, leaveType, leaveCategory, notes } = req.body;
  const category: keyof typeof mockLeaveBalance = leaveCategory;

  // Basic validation
  if (!startDate || !leaveType || !leaveCategory) {
    return res.status(400).json({ success: false, message: 'Start date, leave type, and leave category are required.' });
  }

  // Calculate days requested
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : start;
  const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const daysToDeduct = leaveType === 'half-day' ? 0.5 : days;

  // Logging for debugging
  console.log('--- Leave Request Debug ---');
  console.log('Start Date:', startDate);
  console.log('End Date:', endDate);
  console.log('Leave Type:', leaveType);
  console.log('Leave Category:', leaveCategory);
  console.log('Days calculated:', days);
  console.log('Days to deduct:', daysToDeduct);
  console.log(`Current ${category} balance BEFORE:`, mockLeaveBalance[category]);

  // Deduct from selected category
  if (mockLeaveBalance[category] === undefined) {
    return res.status(400).json({ success: false, message: 'Invalid leave category.' });
  }
  if (mockLeaveBalance[category] < daysToDeduct) {
    console.log('Not enough balance!');
    return res.status(400).json({ success: false, message: `Not enough ${category} leave balance.` });
  }
  mockLeaveBalance[category] -= daysToDeduct;
  console.log(`Current ${category} balance AFTER:`, mockLeaveBalance[category]);

  // Store request
  const newRequest = {
    id: leaveRequests.length + 1,
    startDate,
    endDate: endDate || startDate,
    leaveType,
    leaveCategory,
    notes,
    days: daysToDeduct,
    status: 'Approved',
    submittedAt: new Date().toISOString(),
  };
  leaveRequests.unshift(newRequest);

  return res.json({ success: true, message: 'Leave request submitted successfully.', balance: mockLeaveBalance, request: newRequest });
});

export default router; 