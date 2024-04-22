
"use client"
import { Card, Statistic } from 'antd';
import React from 'react';
import {
    ArrowUpIcon,
} from "@radix-ui/react-icons"

interface StatisticsCardProps {
    title: string;
    value: number;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value }) => {
    return (
        <Card bordered={false} className='w-full'>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpIcon />}
          suffix="%"
        />
      </Card>
    );
};

export default StatisticsCard;