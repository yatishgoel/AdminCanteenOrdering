import client from "./client";
const register = "/register";
const auth = "/admin/auth";

const updateUser = (user) => {
  var userData = new FormData();
  userData.append("email", user.email);
  userData.append("image", {
    name: user.name + "image",
    type: "image/jpeg",
    uri: user.image,
  });
  userData.append("mobile", user.mobile);

  return client.put(register, userData);
};

const loginUser = (user) => client.post(auth, user);

export default {
  loginUser,
  updateUser,
};
