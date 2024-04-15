import {
  FilledButton,
  OutlinedButton,
  SaveButton,
} from "@/components/common/buttons";
import type { FormInstance, FormProps } from "antd";
import { Button, Checkbox, Form, Input, InputNumber } from "antd";

type FieldType = {
  name?: string;
  pass_score?: number;
  duration?: number;
  num_of_attempts?: number;
};

interface Props {
  form: FormInstance;
}
export default function CampaignForm({ form }: Props) {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter campaign name!" }]}
        >
          <Input placeholder="Enter campaign name" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Pass Score"
          name="pass_score"
          rules={[{ required: true, message: "Please enter pass score!" }]}
        >
          <Input placeholder="Enter pass score" className="w-600" />
        </Form.Item>

        <Form.Item<FieldType>
          name="duration"
          label="Duartion"
          rules={[{ required: true, message: "Please enter pass score!" }]}
        >
          <InputNumber placeholder="Enter duration" />
        </Form.Item>

        <Form.Item<FieldType>
          name="num_of_attempts"
          label="Number of Attempts"
          rules={[{ required: true, message: "Please enter pass score!" }]}
        >
          <InputNumber placeholder="Enter number of attempts" />
        </Form.Item>

        {/* <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit" >
          Submit
        </Button>
          <SaveButton form={form}>Submit</SaveButton>
        </Form.Item> */}
      </Form>
    </>
  );
}
