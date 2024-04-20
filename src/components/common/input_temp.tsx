"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "../ui/input";
import { Control } from "react-hook-form";

interface Props {
  //   name: "name" | "duration" | "passScore" | "numOfAttempts";
  [name: string]: any;
  label?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  control?: Control<
    // {
    //   name: string;
    //   passScore: number;
    //   duration: number;
    //   numOfAttempts: number;
    // },
    any,
    any
  >;
}

export const InputTemp = ({
  name,
  label,
  placeholder,
  className,
  type = "text",
  control,
}: Props) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input type={type} placeholder={placeholder} {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

type OptionDataType = {
  id: string;
  value: string;
};

interface DProps extends Props {
  options?: OptionDataType[];
}

export const DropDownTemp = ({
  name,
  label,
  placeholder,
  className,
  options = [],
  control,
}: DProps) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((d, i) => (
                  <SelectItem key={i} value={d.value}>
                    {d.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
