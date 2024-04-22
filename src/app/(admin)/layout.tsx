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
    margin: "24px 16px 0px 24px",
    padding: 16,
    with: "100%",
    minHeight: 280,
    height: "100%",
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };

  return (
    <Layout className="flex flex-col h-full w-full bg-white overflow-hidden">
    {/* <Layout > */}
      <MyHeader />
      <Layout className="w-full h-full">
        <nav>
          <Menus />
        </nav>
        <Content style={style} className="flex-1">
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Game App ©{new Date().getFullYear()} Created by SEEDSTARS ACADEMY
        </Footer>
      </Layout>
    </Layout>
  );
}
