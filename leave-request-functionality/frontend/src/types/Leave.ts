export interface LeaveBalanceType {
  annual: number;
  sick: number;
  casual: number;
}

export interface LeaveRequestType {
  id: number;
  startDate: string;
  endDate: string;
  leaveType: string;
  leaveCategory: string;
  notes?: string;
  days: number;
  status: string;
  submittedAt: string;
} 