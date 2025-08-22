import { createContext } from "react";

const TableContext = createContext({
    selecteds: [],
    setSelecteds: null
})

export default TableContext