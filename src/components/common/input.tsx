"use client";

import { DatePicker, Input, Select } from "antd";
import TypedInputNumber from "antd/es/input-number";
import { CSSProperties } from "react";

interface Props {
  label?: string;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  defaultValue?: string;
  status?: "error" | "";
}

type InputProps = {
  label: string;
  placeholder?: string;
  initialValue?: string;
  status?: "error" | "";
  style?: React.CSSProperties;
  onChange?: (value: string | number) => void;
};

type OptionDataType = {
  label: string;
  value: string;
};

interface DProps extends Props {
  handleChange?: (value: string) => void;
  options: OptionDataType[];
  allowClear?: boolean;
  loading?: boolean;
}

interface PickerProps extends Props {
  handleChange?: (value: string) => void;
  allowClear?: boolean;
  loading?: boolean;
}

export function InputX({
  label,
  placeholder,
  status,
  initialValue,
  style,
  onChange,
}: InputProps) {
  return (
    <>
      <div className="flex flex-col w-full space-y-2">
        <label>{label}</label>
        <Input
          className="h-10"
          placeholder={placeholder}
          status={status}
          style={style}
          onChange={(e) => onChange && onChange(e.target?.value)} 
          defaultValue={initialValue}
        />
        {status && (
          <p className="text-red-600 font-medium">Field is required</p>
        )}
      </div>
    </>
  );
}

export function InputNumberX({
  label,
  placeholder,
  status,
  initialValue,
  style,
  onChange,
}: InputProps) {
  return (
    <>
      <div className="flex flex-col w-full space-y-2">
        <label>{label}</label>
        <TypedInputNumber
          placeholder={placeholder}
          status={status}
          style={{ width: "100%", paddingBlock: 5, ...style }}
          defaultValue={initialValue}
          onChange={(v: any) => onChange && onChange(v)}
        />
        {status && (
          <p className="text-red-600 font-medium">Field is required</p>
        )}
      </div>
    </>
  );
}

export function DropDownX({
  defaultValue,
  label,
  options,
  allowClear,
  style,
  status,
  loading,
  placeholder,
  handleChange,
}: DProps) {
  return (
    <>
      <div className="flex flex-col w-full space-y-2">
        <label>{label}</label>
        <Select
          defaultValue={defaultValue}
          style={{ width: "100%", height: 42, ...style }}
          onChange={handleChange}
          allowClear={allowClear}
          loading={loading}
          options={[...options]}
          status={status}
          placeholder={placeholder}
        />
        {status && (
          <p className="text-red-600 font-medium">Field is required</p>
        )}
      </div>
    </>
  );
}

export function DatePickerX({
  label,
  allowClear,
  defaultValue,
  style,
  status,
  handleChange,
}: PickerProps) {
  return (
    <>
      <div className="flex flex-col w-full space-y-2">
        <label>{label}</label>
        <DatePicker
          onChange={(date: any) =>
            handleChange && handleChange(date?.toISOString().split("T")[0])
          }
          allowClear={allowClear}
          defaultValue={defaultValue}
          className="w-full"
          style={{ height: 42, ...style }}
          status={status}
        />
        {status && (
          <p className="text-red-600 font-medium">Field is required</p>
        )}
      </div>
    </>
  );
}

export function InputPasswordX({
  label,
  placeholder,
  status,
  initialValue,
  style,
  onChange,
}: InputProps) {
  return (
    <>
      <div className="flex flex-col w-full space-y-2">
        <label>{label}</label>
        <Input
          className="h-10"
          placeholder={placeholder}
          status={status}
          style={style}
          type="password"
          onChange={(e) => onChange && onChange(e.target?.value)} 
          defaultValue={initialValue}
        />
        {status && (
          <p className="text-red-600 font-medium">Field is required</p>
        )}
      </div>
    </>
  );
}

export function EmailX({
  label,
  placeholder,
  status,
  initialValue,
  style,
  onChange,
}: InputProps) {
  return (
    <>
      <div className="flex flex-col w-full space-y-2">
        <label>{label}</label>
        <Input
          className="h-10"
          placeholder={placeholder}
          status={status}
          style={style}
          type="email"
          onChange={(e) => onChange && onChange(e.target?.value)} 
          defaultValue={initialValue}
        />
        {status && (
          <p className="text-red-600 font-medium">Field is required</p>
        )}
      </div>
    </>
  );
}
