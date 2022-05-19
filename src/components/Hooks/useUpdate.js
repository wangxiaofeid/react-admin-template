import { useEffect, useRef } from "react";

export default function useUpdate(fun, memoField) {
  const render = useRef(false);

  useEffect(() => {
    if (render.current) {
      fun();
    }
  }, memoField);

  useEffect(() => {
    render.current = true;
  }, []);
}
