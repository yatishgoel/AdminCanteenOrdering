import client from "./client";

const getHistory = (id) => client.get("/admin/history/" + id);
const updatePendingOrder = (userId, orderId, confirmStatus) => {
  return client.get(
    "admin/pending/" +
      userId +
      "?orderId=" +
      orderId +
      "&orderStatus=" +
      confirmStatus
  );
};
const getPendingOrders = (id) => client.get("admin/pendingOrders/" + id);

export default {
  getHistory,
  updatePendingOrder,
  getPendingOrders,
};
