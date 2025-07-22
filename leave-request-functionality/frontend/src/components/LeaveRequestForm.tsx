import React from 'react';
import { Card, Typography, Form, DatePicker, Select, Input, Button } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import { LeaveBalanceType } from '../types/Leave';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const LEAVE_TYPE_OPTIONS: DefaultOptionType[] = [
  { label: 'Full Day', value: 'full-day' },
  { label: 'Half Day', value: 'half-day' },
];

const LEAVE_CATEGORY_OPTIONS: DefaultOptionType[] = [
  { label: 'Annual', value: 'annual' },
  { label: 'Sick', value: 'sick' },
  { label: 'Casual', value: 'casual' },
];

export interface LeaveRequestFormProps {
  onSubmit: (values: any) => void;
  submitting: boolean;
}

const LeaveRequestForm: React.FC<LeaveRequestFormProps> = ({ onSubmit, submitting }) => {
  const [form] = Form.useForm();
  const handleFinish = (values: any) => {
    onSubmit(values);
    // Reset form after successful submit (parent will control when to reset)
  };
  return (
    <Card>
      <Title level={4}>Request Leave</Title>
      <Form layout="vertical" onFinish={handleFinish} form={form}>
        <Form.Item
          label="Leave Category"
          name="leaveCategory"
          rules={[{ required: true, message: 'Please select leave category' }]}
        >
          {/* @ts-ignore */}
          <Select options={LEAVE_CATEGORY_OPTIONS} placeholder="Select leave category" />
        </Form.Item>
        <Form.Item
          label="Date Range"
          name="dateRange"
          rules={[{ required: true, message: 'Please select date(s)' }]}
        >
          <RangePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Leave Type"
          name="leaveType"
          rules={[{ required: true, message: 'Please select leave type' }]}
        >
          {/* @ts-ignore */}
          <Select options={LEAVE_TYPE_OPTIONS} placeholder="Select leave type" />
        </Form.Item>
        <Form.Item label="Notes (optional)" name="notes">
          <Input.TextArea rows={3} maxLength={200} placeholder="Add notes (optional)" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting} block>
            Submit Request
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LeaveRequestForm; 