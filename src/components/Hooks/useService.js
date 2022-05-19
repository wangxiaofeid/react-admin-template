import { useState, useEffect, useCallback } from "react";

export default function useService(service, defaultValue = []) {
  const [index, setIndex] = useState(1);
  const [data, setData] = useState(defaultValue);
  useEffect(() => {
    service().then((data) => setData(data));
  }, [index]);
  const reload = useCallback(() => {
    setIndex((index) => index + 1);
  }, []);
  return [data, reload];
}
