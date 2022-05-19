import { useState, useCallback } from "react";
import { SchemaForm, SchemaMarkupField as Field, createFormActions } from "@formily/antd";
import { Input, Select } from "@formily/antd-components";
import { Modal } from "antd";
import { randomCode } from "@/utils";
import { labelRegCheck, maxLength50, noSpaceRegCheck } from "@/utils/reg";

const actions = createFormActions();
const sComponents = {
  Input,
  Select
};

export default ({ visible, record, onCancel, onSave }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onSubmit = useCallback((values) => {
    setConfirmLoading(true);
    onSave(values).finally(() => {
      setConfirmLoading(false);
    });
  }, []);
  const { uuid, name, code, description } = record || {};
  const title = `${uuid ? "编辑" : "新增"}标签`;

  return (
    <Modal
      title={title}
      visible={visible}
      confirmLoading={confirmLoading}
      destroyOnClose
      onCancel={onCancel}
      onOk={() => actions.submit()}
    >
      <SchemaForm
        actions={actions}
        labelCol={4}
        wrapperCol={18}
        components={sComponents}
        initialValues={{
          uuid,
          name,
          code: code || randomCode(),
          description
        }}
        onSubmit={onSubmit}
      >
        <Field
          required
          type="string"
          title="名称"
          name="name"
          x-component="Input"
          x-rules={[
            { required: true },
            maxLength50,
            noSpaceRegCheck,
            (value) =>
              new Promise((resolve) => {
                if (/[:;]/.test(value)) {
                  resolve("不能包含引号分号");
                } else {
                  resolve();
                }
              })
          ]}
        />
        <Field
          required
          type="string"
          title="标识"
          name="code"
          x-component="Input"
          x-rules={[{ required: true }, maxLength50, labelRegCheck]}
        />
        <Field
          type="string"
          title="描述"
          name="description"
          x-component="Input"
          x-rules={[maxLength50]}
        />
      </SchemaForm>
    </Modal>
  );
};
