import React from 'react';
import { Layout, Menu, Dropdown, Button } from "antd";
import { Link } from 'react-router-dom';
import { HomeOutlined, BookOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'));
  const adminMenu = (
    <Menu>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/login';
        }}
      >
        <span style={{ color: 'orangered' }}>Logout</span>
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="bookings" icon={<BookOutlined />}>
        <Link to="/userbookings">Bookings</Link>
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/login';
        }}
      >
        <span style={{ color: 'orangered' }}>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#001529',
          padding: '0 20px',
        }}
      >
        <div style={{ color: 'orangered', fontSize: '20px', fontWeight: 'bold' }}>
          <Link
            to={user.username === "Baba Afrid" ? "/admin" : "/"}
            style={{ color: 'orangered', textDecoration: 'none' }}
          >
          AM Cars
          </Link>
        </div>

        <Dropdown
          overlay={user.username === "Baba Afrid" ? adminMenu : userMenu}
          placement="bottomRight"
        >
          <Button
            type="primary"
            icon={<UserOutlined />}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#1890ff',
              borderColor: '#1890ff',
            }}
          >
            {user?.username || 'User'}
          </Button>
        </Dropdown>
      </Header>

      <Content style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
        {props.children}
      </Content>
    </Layout>
  );
}

export default DefaultLayout;
