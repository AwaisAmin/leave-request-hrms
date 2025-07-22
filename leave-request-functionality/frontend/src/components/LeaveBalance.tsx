import React from 'react';
import { Card, Typography, Row, Col, Spin } from 'antd';
import { LeaveBalanceType } from '../types/Leave';

const { Title } = Typography;

export interface LeaveBalanceProps {
  leaveBalance: LeaveBalanceType | null;
  loading: boolean;
}

const LeaveBalance: React.FC<LeaveBalanceProps> = ({ leaveBalance, loading }) => (
  <Card style={{ marginBottom: 24 }}>
    <Title level={4}>Leave Balance</Title>
    {loading ? <Spin /> : leaveBalance && (
      <Row gutter={16}>
        <Col span={8}><b>Annual:</b> {leaveBalance.annual}</Col>
        <Col span={8}><b>Sick:</b> {leaveBalance.sick}</Col>
        <Col span={8}><b>Casual:</b> {leaveBalance.casual}</Col>
      </Row>
    )}
  </Card>
);

export default LeaveBalance; 