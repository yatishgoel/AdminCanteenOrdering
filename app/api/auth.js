import client from "./client";
const register = "/register";
const auth = "/auth";
const verify = "/verify";

const registerUser = (user) => {
  var userData = new FormData();
  userData.append("name", user.name);
  userData.append("email", user.email);
  userData.append("hall", user.hall);
  userData.append("mobile", user.mobile);
  userData.append("password", user.password);
  userData.append("confirmPassword", user.confirmPassword);
  userData.append("room", user.room);
  // userData.append("image", user.image);
  userData.append("image", {
    name: user.name + "image",
    type: "image/jpeg",
    uri: user.image,
  });

  return client.post(register, userData);
};

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
const sendOTP = (otp) => client.post(verify, otp);
const resendOTP = (id) => client.post(verify + "/resend", id);

export default {
  registerUser,
  loginUser,
  sendOTP,
  resendOTP,
  updateUser,
};
