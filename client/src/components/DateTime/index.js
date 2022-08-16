import 'antd/dist/antd.css';
import React from 'react';
import { DatePicker, Space } from 'antd';
import './DateTime.css';

function DateTime() {
    return (
        <Space direction="vertical">
            <DatePicker className="datetime" />
        </Space>
    );
}

export default DateTime;
