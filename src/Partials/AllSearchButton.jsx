import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
// import  { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items = [
  {
    key: '1',
    label: (
      <a target="" rel="noopener noreferrer" href="/hospitals">
        Hospitals
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="" rel="noopener noreferrer" href="/doctors">
        Doctors
      </a>
    ),
  },
];

const AllSearchButton = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Search
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default AllSearchButton;