import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
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
  size?: "small"| "middle"| "large";
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
    size={p.size ?? "middle"}
  />
);

export default GTable;
