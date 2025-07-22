import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import LeaveBalance from './components/LeaveBalance';
import LeaveRequestForm from './components/LeaveRequestForm';
import LeaveHistory from './components/LeaveHistory';
import { LeaveBalanceType, LeaveRequestType } from './types/Leave';
import './App.css';

const { Header, Content } = Layout;

function App() {
  const [leaveBalance, setLeaveBalance] = useState<LeaveBalanceType | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [history, setHistory] = useState<LeaveRequestType[]>([]);
  const [formKey, setFormKey] = useState(0); // for resetting form

  const fetchBalance = () => {
    setLoading(true);
    fetch('http://localhost:4000/leave-balance')
      .then(res => res.json())
      .then(data => {
        if (data.success) setLeaveBalance(data.data);
      })
      .finally(() => setLoading(false));
  };

  const fetchHistory = () => {
    fetch('http://localhost:4000/leave-history')
      .then(res => res.json())
      .then(data => {
        if (data.success) setHistory(data.data);
      });
  };

  useEffect(() => {
    fetchBalance();
    fetchHistory();
  }, []);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    const { dateRange, leaveType, leaveCategory, notes } = values;
    const category: keyof LeaveBalanceType = leaveCategory;
    const payload = {
      startDate: dateRange ? dateRange[0].format('YYYY-MM-DD') : null,
      endDate: dateRange && dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : null,
      leaveType,
      leaveCategory,
      notes,
    };
    // Calculate days to request
    let daysToRequest = 1;
    if (payload.startDate && payload.endDate) {
      const start = new Date(payload.startDate);
      const end = new Date(payload.endDate);
      daysToRequest = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    }
    if (leaveType === 'half-day') daysToRequest = 0.5;
    if (!leaveBalance || leaveBalance[category] <= 0) {
      toast.error(`You have no ${String(category)} leave balance left.`);
      setSubmitting(false);
      return;
    }
    if (daysToRequest > leaveBalance[category]) {
      toast.error(`Not enough ${String(category)} leave balance.`);
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/leave-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errData = await res.json();
        toast.error(errData.message || 'Submission failed');
        setSubmitting(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setLeaveBalance({ ...data.balance });
        fetchHistory();
        setFormKey(k => k + 1); // reset form
      } else {
        toast.error(data.message || 'Submission failed');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Toaster position="top-center" />
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <h3 style={{ margin: 0 }}>Leave Request (HRMS Module)</h3>
      </Header>
      <Content style={{ padding: 24, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div className="leave-layout">
          <div className="leave-form-col">
            <LeaveBalance leaveBalance={leaveBalance} loading={loading} />
            <div key={formKey}>
              <LeaveRequestForm onSubmit={onFinish} submitting={submitting} />
            </div>
          </div>
          <div className="leave-history-col">
            <LeaveHistory history={history} />
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default App; 