import React, { useState } from 'react';
import {
  Button,
  Layout,
  Menu,
  Popover,
} from 'antd';
import {
  HomeOutlined,
  IdcardOutlined,
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/AuthReducer';
import './Fragment.scss';
import Loader from '../../loader/Loader';

const { Header, Content } = Layout;
function getItem(
  label,
  key,
  icon,
  onClick,
  children,
  type
) {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick,
  };
}

const Fragment = ({ children }) => {
  const user = useSelector(state => state.auth.user);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickChange = open => {
    setIsClicked(open);
  };

  const onProfileOpen = () => {
    navigate('/profile');
    handleClickChange(false);
  };

  const onLogout = () => {
    handleClickChange(false);
    dispatch(logout());
    navigate('/');
  };

  return (
    <Layout className="layout">
      <Header className="layout--header">
        <div
          className="layout--header--home--btn"
          onClick={() => navigate('/')}
        >
          <HomeOutlined/> Auction
        </div>
        <div className="layout--header--avatar--icn">
          <Popover
            content={
              <Menu
                mode="vertical"
                items={[
                  getItem(
                    'My Profile',
                    'sub1',
                    <IdcardOutlined/>,
                    onProfileOpen,
                  ),
                  getItem(
                    'Settings',
                    'sub3',
                    <SettingOutlined/>
                  ),
                  getItem(
                    'Logout',
                    'sub4',
                    <PoweroffOutlined/>,
                    onLogout,
                  ),
                ]}
              />
            }
            title={user?.name || 'Title'}
            trigger="click"
            open={isClicked}
            onOpenChange={handleClickChange}
          >
            <Button icon={<UserOutlined/>}/>
          </Popover>
        </div>
      </Header>
      <Content className="layout--content">
        {children}
      </Content>
      <Loader/>
    </Layout>
  );
};

export default Fragment;