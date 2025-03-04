import React, { useState, useEffect } from "react";
import { Descriptions } from "antd";
import Column from "../../../../widgets/Column";

interface DetailProps {
  model: any;
  columns: any;
  title?: any;
}
export default function Detail(props: DetailProps) {
  const { model, columns, title = null } = props;
  const [ledapColumns, setLedapColumns] = useState(
    Column.normalizeColumns(columns)
  );
  const [, setBool] = useState(false);
  const _updateView = () => {
    setBool((b) => !b);
  };

  useEffect(() => {
    setLedapColumns(Column.normalizeColumns(columns));
  }, [columns]);
  const antColumns = getAntColumns(ledapColumns, model);
  return <Descriptions title={title} items={antColumns} />;
}

function getAntColumns(ledapColumns, model) {
  const targetColumns = [];
  for (let i = 0; i < ledapColumns.length; i++) {
    const column = ledapColumns[i];
    const { label, value, attribute, visible } = column;
    // 不可见
    if (visible == false) {
      continue;
    }
    const antdColumn: any = {
      label: getTableTitle(column),
    };
    if (attribute) {
      antdColumn.key = attribute;
    }

    if (typeof value == "function") {
      antdColumn.children = value(model);
    } else {
      antdColumn.children = `${model[attribute]}`;
    }
    targetColumns.push(antdColumn);
  }
  return targetColumns;
}

function getTableTitle(column) {
  const { labelFormat, label, attribute } = column;
  if (typeof label == "function") {
    if (labelFormat == "html") {
      return <span dangerouslySetInnerHTML={{ __html: label() }}></span>;
    }
    return label();
  }
  return label || attribute;
}
