import * as SecureStore from "expo-secure-store";

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
    console.log(authToken, "Auth token saved");
  } catch (err) {
    console.log("Cannot Store Token", err);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (err) {
    console.log("Cannot retrive token from storage", err);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log("deleted");
  } catch (err) {
    console.log("Cannot delete authtoken", err);
  }
};

export default { getToken, storeToken, removeToken };
