import { useState, useCallback } from "react";

export default function useEdit({ onSave: doSave, onDelete: doDelete }) {
  const [editItem, setEditItem] = useState(false);
  const [editType, setEditType] = useState(false);

  const onSave = useCallback((values) => {
    return doSave(values);
  }, []);

  const onDelete = useCallback((values) => {
    return doDelete(values);
  }, []);

  const onAdd = useCallback((obj = {}, editType = false) => {
    setEditItem(obj.isDefaultPrevented ? {} : obj);
    setEditType(editType);
  }, []);

  const onCancel = useCallback(() => {
    setEditItem(false);
    setEditType(false);
  }, []);

  return {
    editItem,
    editType,
    onSave,
    onDelete,
    onAdd,
    onEdit: onAdd,
    onShow: (obj) => onAdd(obj, "show"),
    onCancel
  };
}
