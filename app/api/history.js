import client from "./client";

const getHistory = (id) => client.get("/admin/history/" + id);

export default {
  getHistory,
};
