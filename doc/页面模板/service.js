import { createService } from "@/services";

export default createService({
  query: {
    url: "/api/demo/query"
  },
  delete: {
    url: "/api/demo/delete"
  },
  add: {
    url: "/api/demo/add",
    method: "post"
  },
  update: {
    url: "/api/demo/update",
    method: "post"
  }
});
