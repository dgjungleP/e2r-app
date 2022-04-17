import React, { useEffect, useState } from "react";
import "./index.css";
import { Button, Card, Col, Divider, Input, Row, Select } from "antd";
import { jx_gjhlt_tpl } from "./form_template/template";
import { createRoot } from "react-dom/client";
import {
  createFile,
  doOpensess,
  makeOrigin,
  caculateExtra,
} from "./button_event";
const templaTeSelector = [{ key: "jx_gjhlt_tpl", value: jx_gjhlt_tpl }];
function SimplePage() {
  const [template, setTemplate] = useState([]);
  useEffect(() => {
    setTemplate(jx_gjhlt_tpl);
    console.log(template);
  }, []);
  return (
    <>
      <Row gutter={24}>
        {template.map((card) => {
          return (
            <Col span={8}>
              <Card
                key={card.key}
                title={card.title}
                type="inner"
                style={{ marginBottom: "20px", marginRight: "20px" }}
                bodyStyle={{ height: 150, overflowY: "auto" }}
              >
                {card.line.map((line) => {
                  return (
                    <BaseInput
                      title={line.title}
                      value={line.value}
                      key={line.key}
                    ></BaseInput>
                  );
                })}
              </Card>
            </Col>
          );
        })}
      </Row>
      <Divider>Action</Divider>
      <span>选择截面</span>
      <Select></Select>
      <span>选择类型</span>
      <Select></Select>
      <Button onClick={createFile}>创建TCL文件</Button>
      <Button onClick={doOpensess}>PMM分析</Button>
      <Button onClick={makeOrigin}>获取表数据</Button>
      <Button onClick={caculateExtra}>其他计算</Button>
    </>
  );
}
function BaseInput(props) {
  return (
    <Row align="midlle">
      <Col className="center-col" span={8}>
        <span style={{ fontSize: "12px", color: "#333", fontWeight: "bold" }}>
          {props.title}:
        </span>
      </Col>
      <Col>
        <Input value={props.value} size="small"></Input>
      </Col>
    </Row>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<SimplePage />);
