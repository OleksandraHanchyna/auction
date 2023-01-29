import React from 'react';
import { Avatar } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { dateFormat } from '../../../../static/variables';
import './UserAction.scss';

const UserAction = ({ id, username, avatar, updateDate, stepRate }) => {
  return (
    <li key={id} className="action">
      <div className="action-block">
        <div className="action--avatar">
          <Avatar src={avatar || 'https://joeschmoe.io/api/v1/random'}/>
        </div>
        <div className="action--info">
          {username}
        </div>
      </div>
      <div className="action-block">
        <div className="action--date">
          {dayjs(updateDate).format(dateFormat)}
        </div>
        <div className="action--rate">
          {stepRate} <UpOutlined/>
        </div>
      </div>
    </li>
  );
};

export default UserAction;