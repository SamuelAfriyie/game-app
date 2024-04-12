import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { title } from "process";
import { TableRowSelection } from "antd/es/table/interface";

type Scroll = {
  x: string | number;
  y: string | number;
};

interface Props {
  title?: () => string;
  columns: ColumnsType<any> | undefined;
  dataSource: any[];
  bordered?: boolean;
  loading?: boolean;
  scroll?: Scroll;
  pagination?: any;
  rowSelection?: TableRowSelection<any>;
}

const GTable = (p: Props) => (
  <Table
    title={p.title}
    columns={p.columns}
    dataSource={p.dataSource}
    bordered={p.bordered}
    loading={p.loading}
    scroll={p.scroll ?? { x: 0, y: 340 }}
    pagination={p.pagination ?? true}
    rowSelection={p.rowSelection}
    
  />
);

export default GTable;
