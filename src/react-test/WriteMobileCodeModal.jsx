import React, { useEffect, useRef, useState } from "react";
import * as ledap from "./lib/ledap";
import { Form, FormItem, Button, Modal } from "@/platforms/react";

export default function WriteMobileCodeModal(props) {
  const { onSuccess, ...reset } = props;
  const [loading, setLoading] = useState(false);
  const { current: model } = useRef(ledap.App.getModel(getMobileData()));
  const { closeModal } = Modal.useModalContext();

  function _handleOk() {
    // 前端校验
    if (!model.validate()) {
      ledap.App.message(model.getFirstError(), { variant: "warning" });
      return;
    }
    setLoading(true);
    ledap.App.post("/mis-api/user/mobile-code", model)
      .then((res) => {
        setLoading(false);
        ledap.App.message(res.message, { variant: "success" });
        onSuccess && onSuccess();
        closeModal();
      })
      .catch((e) => {
        setLoading(false);
      });
  }
  return (
    <Modal
      title="写验证码"
      okText="提交"
      onOk={_handleOk}
      confirmLoading={loading}
      {...reset}
    >
      <Form model={model} layout="horizontal">
        <FormItem attr="mobilePrefix" />
        <FormItem attr="mobile" />
        <FormItem attr="code" />
      </Form>
    </Modal>
  );
}

const getMobileData = () => ({
  code: {
    label: "验证码",
    rules: [
      {
        type: "double",
        options: {
          pattern: {},
          message: "验证码必须是整数。",
          skipOnEmpty: 1,
        },
        skipOnError: true,
        skipOnEmpty: true,
      },
      {
        type: "required",
        options: {
          message: "验证码不能为空。",
        },
        skipOnError: true,
        skipOnEmpty: false,
      },
    ],
    value: null,
  },
  mobile: {
    label: "手机号",
    rules: [
      {
        type: "double",
        options: {
          pattern: {},
          message: "手机号必须是整数。",
          skipOnEmpty: 1,
        },
        skipOnError: true,
        skipOnEmpty: true,
      },
      {
        type: "required",
        options: {
          message: "手机号不能为空。",
        },
        skipOnError: true,
        skipOnEmpty: false,
      },
    ],
    value: null,
  },
  mobilePrefix: {
    label: "区号",
    rules: [
      {
        type: "double",
        options: {
          pattern: {},
          message: "区号必须是整数。",
          skipOnEmpty: 1,
        },
        skipOnError: true,
        skipOnEmpty: true,
      },
      {
        type: "required",
        options: {
          message: "区号不能为空。",
        },
        skipOnError: true,
        skipOnEmpty: false,
      },
    ],
    value: null,
  },
});
