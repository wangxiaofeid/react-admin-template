import { useCallback } from "react";
import { Popconfirm, Button, message } from "antd";
import { QueryListScene, Handle } from "tntd";
import { useEdit } from "@/components/Hooks";
import EditModal from "./Edit";
import service from "./service";

const { QueryForm, Field, QueryList, createActions } = QueryListScene;
const actions = createActions();

export default function Demo() {
  const query = useCallback((params) => {
    return service.query({ ...params, curPage: params.current || 1 }).then((res) => {
      const { curPage, pageSize, total, data } = res || {};
      return {
        current: curPage,
        pageSize,
        total,
        data: data || []
      };
    });
  }, []);

  const { editItem, onSave, onDelete, onAdd, onEdit, onCancel } = useEdit({
    onSave: (value) => {
      const actionsFun = service[value.uuid ? "update" : "add"];
      return actionsFun({ ...value }).then(() => {
        message.success(value.uuid ? "修改成功" : "新增成功");
        onCancel();
        actions.search(value.uuid ? {} : { current: 1 });
        return true;
      });
    },
    onDelete: (uuid) => {
      return service.delete({ uuid }).then(() => {
        message.success("删除成功");
        const { current = 1, pageSize = 10, total = 0 } = actions.getPagination() || {};
        actions.search({
          current: Math.max(pageSize * (current - 1) < total - 1 ? current : current - 1, 1)
        });
        return true;
      });
    }
  });

  const columns = [
    { dataIndex: "name", title: "名称", width: 200, ellipsis: true },
    { dataIndex: "desc", title: "描述", width: 200, ellipsis: true },
    { dataIndex: "gmtCreate", title: "创建时间", width: 180, ellipsis: true },
    { dataIndex: "gmtModify", title: "最后修改时间", width: 180, ellipsis: true },
    {
      dataIndex: "actions",
      title: "操作",
      width: 120,
      fixed: "right",
      render: (text, row) => {
        return (
          <Handle>
            <a onClick={() => onEdit(row)}>编辑</a>
            <Popconfirm
              title="确认删除该条记录吗？"
              onConfirm={() => onDelete(row.uuid)}
              okText="是"
              cancelText="否"
            >
              <a>删除</a>
            </Popconfirm>
          </Handle>
        );
      }
    }
  ];

  return (
    <QueryListScene query={query} actions={actions} title="标签库">
      <QueryForm
        extraActions={
          <Button type="primary" onClick={onAdd}>
            新增
          </Button>
        }
      >
        <Field
          type="input"
          name="fuzzyName"
          props={{
            placeholder: "请输入名称",
            allowClear: true
          }}
        />
      </QueryForm>

      <QueryList rowKey="id" scroll={{ x: 980 }} columns={columns} />
      <EditModal record={editItem} visible={!!editItem} onCancel={onCancel} onSave={onSave} />
    </QueryListScene>
  );
}
