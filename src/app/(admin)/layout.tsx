"use client";
import React, { useState } from "react";
import { Layout, theme } from "antd"; 
import MyHeader from "@/components/common/header";
import Sider from "antd/es/layout/Sider";
import Menus from "@/components/common/menu";
import { Footer } from "antd/es/layout/layout";

const { Content } = Layout;

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const style = {
    margin: "24px 16px",
    padding: 16,
    with: "100%",
    // padding: 24,
    minHeight: 280,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };

  return (
    <Layout className="h-dvh">
      <Sider trigger={null} collapsible collapsed={collapsed} width={400}>
        <div className="h-16" />
        <Menus />
      </Sider>
      <Layout>
        <MyHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          colorBgContainer={colorBgContainer}
        />
        <Content style={style} className="overflow-hidden  ">
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Game App ©{new Date().getFullYear()} Created by BenMeredith
        </Footer>
      </Layout>
    </Layout>
  );
}
