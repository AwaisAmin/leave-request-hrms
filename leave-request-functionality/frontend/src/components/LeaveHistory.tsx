import React from 'react';
import { Card, Empty } from 'antd';
import { LeaveRequestType } from '../types/Leave';

const LeaveHistory: React.FC<{ history: LeaveRequestType[] }> = ({ history }) => (
  <div style={{ marginTop: 32 }}>
    <h4>Leave Request History</h4>
    {history.length === 0 ? (
      <Empty description="No leave requests submitted yet." />
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {history.map(req => (
          <Card key={req.id} style={{ borderLeft: '4px solid #1677ff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span><b>Date(s):</b> {req.startDate}{req.endDate && req.endDate !== req.startDate ? ` to ${req.endDate}` : ''}</span>
              <span style={{ color: req.status === 'Approved' ? 'green' : 'red', fontWeight: 500 }}>{req.status}</span>
            </div>
            <div><b>Type:</b> {req.leaveType}</div>
            <div><b>Days:</b> {req.days}</div>
            <div><b>Notes:</b> {req.notes || '-'}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Submitted: {new Date(req.submittedAt).toLocaleString()}</div>
          </Card>
        ))}
      </div>
    )}
  </div>
);

export default LeaveHistory; 