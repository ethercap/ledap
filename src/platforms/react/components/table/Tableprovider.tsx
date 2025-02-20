import React, { useState } from "react";
import TableContext from "./TableContext";

function TableProvider(props) {
  const [selected, setSelected] = useState([]);
  return (
    <TableContext.Provider value={{ selected, setSelected }}>
      {props.children}
    </TableContext.Provider>
  );
}
