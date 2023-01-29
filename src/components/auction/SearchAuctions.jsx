import React from 'react';
import { Input } from 'antd';

const SearchAuctions = ({ onSearch }) => (
  <Input.Search
    placeholder="Enter Title"
    onSearch={ onSearch }
  />
);

export default SearchAuctions;
