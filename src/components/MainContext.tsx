import React, { useMemo, useState, useCallback } from "react";
import { Table } from "../types";

const emptyTable: Table = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}

export const MainContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {},
  table: emptyTable,
  setTable: (table: Table) => {},
  pageCount: 0,
  setPageCount: (pageCount: number) => {},
  itemOffset: 0,
  setItemOffset: (itemOffset: number) => {},
  handlePageClick: (event: {selected: number}) => {}
});

type Props = {
  children: React.ReactNode;
}

export const MainProvider: React.FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [table, setTable] = useState<Table>(emptyTable);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = useCallback(
    (event: { selected: number; }) => {
      const newOffset = event.selected * 10 % table.count;
      setItemOffset(newOffset);
    }, [table.count]);

  const value = useMemo(() => ({
    isLoggedIn,
    setIsLoggedIn,
    table,
    setTable,
    pageCount,
    setPageCount,
    itemOffset,
    setItemOffset,
    handlePageClick
  }), [isLoggedIn, table, pageCount, itemOffset, handlePageClick]);

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  )
};