import { useState, useEffect, useCallback } from "react";

export default function useTable(query, memoField, pageSize = 10) {
  const [tableData, setTableData] = useState({
    current: 1,
    pageSize,
    total: 0,
    data: []
  });

  useEffect(() => {
    query({ curPage: 1, pageSize }).then((res) => setTableData(res));
  }, memoField);

  const reSearch = useCallback(
    (current) => {
      query({
        curPage: current || tableData.current,
        pageSize: tableData.pageSize
      }).then((res) => setTableData(res));
    },
    [...memoField, tableData.current, tableData.pageSize]
  );

  const onChange = useCallback(
    (current) => {
      query({
        curPage: current,
        pageSize: tableData.pageSize
      }).then((res) => setTableData(res));
    },
    [...memoField, tableData.pageSize]
  );

  const onShowSizeChange = useCallback((current, pageSize) => {
    query({ curPage: 1, pageSize }).then((res) => setTableData(res));
  }, memoField);

  return { tableData, reSearch, onChange, onShowSizeChange };
}
