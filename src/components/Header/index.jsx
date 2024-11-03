import React, { useState } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./index.css";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Headers = () => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <Layout>
            <Header
                style={{
                    position: "fixed",
                    zIndex: 999,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div
                    className="logo"
                    style={{
                        color: "white",
                        fontSize: "24px",
                    }}
                >
                    My Logo
                </div>

                {/* Menu cho desktop */}
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "flex-end",
                    }}
                    className="menu-desktop"
                >
                    <Menu.Item key="1">
                        <Link to="/">Trang Chủ</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/new-movie">Phim Mới</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="#!">Phim Lẻ</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/categories">Thể Loại</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/countries">Quốc Gia</Link>
                    </Menu.Item>
                </Menu>

                {/* Button mở Drawer cho mobile */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Button
                        className="menu-mobile"
                        type="primary"
                        icon={<MenuOutlined />}
                        onClick={showDrawer}
                        style={{
                            display: "none",
                        }}
                    />
                </div>
            </Header>

            {/* Drawer hiển thị khi ở mobile */}
            <Drawer
                title="Menu"
                placement="right"
                onClose={onClose}
                visible={visible}
                className="menu-mobile"
            >
                <Menu mode="vertical" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1">
                        <Link to="/">Trang Chủ</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/new-movie">Phim Mới</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="#!">Phim Lẻ</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/categories">Thể Loại</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/countries">Quốc Gia</Link>
                    </Menu.Item>
                </Menu>
            </Drawer>
        </Layout>
    );
};

export default Headers;