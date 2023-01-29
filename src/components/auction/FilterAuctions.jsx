import React from 'react';
import { Dropdown, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const items = [
  {
    key: 1,
    label: (<a>My Auctions</a>),
  },
  {
    key: 2,
    label: (<a>Favorites</a>),
  },
];

const FilterAuctions = ({ filterBy }) => {
  return (
    <Dropdown className="filter" menu= {{ items }}>
      <Button className="ant-dropdown-link" icon={<MenuOutlined />} />
    </Dropdown>
  );
};

export default FilterAuctions;
