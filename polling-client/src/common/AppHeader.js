import React, {Component} from 'react';
import {Layout, Menu, Dropdown} from "antd";
import {Link} from "react-router-dom";
import {
    HomeOutlined,
    AreaChartOutlined,
    UserOutlined,
    DownOutlined,
} from '@ant-design/icons'
import './AppHeader.css'

const {Header} = Layout

class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.handleMenuClick = this.handleMenuClick.bind(this)
    }

    handleMenuClick({key}) {
        console.log(key + " has been clicked")
    }

    render() {
        let menuItems;
        if (this.props.currentUser) {
            // logged in
            menuItems = [
                <Menu.Item key="/">
                    <HomeOutlined />
                </Menu.Item>,
                <Menu.Item key="/poll/new">
                    <AreaChartOutlined className="poll-icon" />
                </Menu.Item>,
                <Menu.Item key="/profile" className="profile-menu">
                    <ProfileDropdownMenu
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>,
            ]
        } else {
            // not logged in yet
            menuItems = [
                <Menu.Item key="/login">
                    Login
                </Menu.Item>,
                <Menu.Item key="/signup">
                    Sign Up
                </Menu.Item>
            ]
        }
        return (
            <Header className="app-header">
                <div className="container">
                    <div className="app-title">
                        <Link to="/">Polling App</Link>
                    </div>
                    <Menu className="app-menu"
                          theme="dark"
                          mode="horizontal"
                          defaultSelectedKeys={['/']}
                          style={{lineHeight: '64px'}}>
                        {menuItems}
                    </Menu>
                </div>
            </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    Naichuan Zhang
                </div>
                <div className="username-info">
                    naichuan-zhang
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="profile" className="dropdown-item">
                Profile
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" className="dropdown-item">
                Logout
            </Menu.Item>
        </Menu>
    )
    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName("profile-menu")[0]}>
            <span>
                <UserOutlined className="nav-icon" style={{marginRight: 0}} />
                <DownOutlined />
            </span>
        </Dropdown>
    )
}

export default AppHeader;