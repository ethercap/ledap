import React, { useState, useEffect } from "react";
import * as ledap from "./lib/ledap";
import {
  Form,
  FormItem,
  Button,
  FormValidateEvent,
  RadioGroup,
  CheckboxGroup,
  Select,
  SearchInput,
  DatePicker,
  Table,
  Modal,
} from "@/platforms/react";
import { Flex, Row, Col } from "antd";
import WriteMobileCodeModal from "./WriteMobileCodeModal";
import { GetParams } from "./utils.js";

export default function TableTest() {
  const [selectedIds, setSelectedIds] = useState([]);

  const dp = ledap.App.useWebDp({
    httpOptions: {
      url: "/mis-api/user/index",
      params: GetParams(),
    },
  });

  const userDp = ledap.App.useWebDp({
    httpOptions: {
      url: "/mis-api/search/user",
      params: {},
    },
  });

  const _clickDel = (model) => {
    Modal.confirm({
      title: "删除用户",
      content: (
        <div>
          <p>确定要删除 {model.fullname} 吗？</p>
        </div>
      ),
      okText: "确定",
      okType: "danger",
      onOk() {
        ledap.App.post("/mis-api/user/delete", { id: model.id })
          .then(() => {
            ledap.App.message("删除成功", { variant: "info" });
            dp.refresh();
          })
          .catch(() => {});
      },
    });
  };

  function _handleSearch() {
    dp.refresh();
  }

  function _previewSelected() {
    const selectedIds = dp?.models
      ?.filter((m) => m.is_checked === true)
      .map((m) => m.id);
    console.log(selectedIds);
  }

  function _writeCode() {
    Modal.create({
      Modal: WriteMobileCodeModal,
      onSuccess: () => {
        dp.refresh();
      },
    });
  }

  const columns = [
    "id",
    { attribute: "id", label: "ID", useSort: true },
    { attribute: "code", label: "code" },
    {
      attribute: "username",
      label: "用户名",
      value: (model) => <span>{model.fullname}</span>,
    },
    {
      attribute: "statusDesc",
    },
    {
      label: "操作",
      value: (model) => {
        return (
          <Button.Group>
            <Button
              type="primary"
              onClick={() => {
                window.open(
                  `https://mis.dev.chuanyuapp.com/user/view?id=${model.id}`
                );
              }}
            >
              查看
            </Button>
            <Button type="primary" danger onClick={() => _clickDel(model)}>
              删除
            </Button>
          </Button.Group>
        );
      },
    },
  ];

  return (
    <>
      <Form model={dp.searchModel}>
        <Row>
          <Col span={12}>
            <FormItem
              attr="id"
              FormComponent={SearchInput}
              dp={userDp}
              FormComponentProps={{
                fieldNames: { label: "text", value: "id" },
              }}
            />
          </Col>
          <Col span={12}>
            <FormItem attr="username" />
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <FormItem attr="status" FormComponent={Select} />
          </Col>
          <Col span={8} offset={4}>
            <Button onClick={_writeCode}>写验证码</Button>
            <Button onClick={_handleSearch}>查询</Button>
            <Button onClick={_previewSelected}>查看选中</Button>
          </Col>
        </Row>
      </Form>
      <Table
        columns={columns}
        dp={dp}
        useSelection
        // onSelectionChanged={(selectedRowKeys, selectedRows) => {
        //   setSelectedIds(selectedRowKeys);
        // }}
      />
    </>
  );
}
