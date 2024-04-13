"use client";
import React from "react";
import { Layout, theme } from "antd";
import MyHeader from "@/components/common/header";
import Menus from "@/components/common/menu";
import { Footer } from "antd/es/layout/layout";

const { Content } = Layout;

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const style = {
    margin: "24px 16px",
    padding: 16,
    with: "100%",
    minHeight: 280,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };
 
  return (
    <Layout className="h-dvh">
      <MyHeader colorBgContainer={colorBgContainer} />
      <Layout>
        <nav>
          <Menus />
        </nav>
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
