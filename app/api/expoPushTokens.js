import client from "./client";

const register = (pushToken) =>
  client.post("/admin/expoPushTokens", { token: pushToken });

export default {
  register,
};
