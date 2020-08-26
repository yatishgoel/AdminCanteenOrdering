import client from "./client";

const endpoint = "/menu";

const getFoodItems = (hallNum = "") => client.get(endpoint + "/" + hallNum);
const deleteListing = (id) => client.delete(endpoint + "/" + id);
const updateListing = (id, item) => client.put(endpoint + "/" + id, item);

const addFoodListing = (user) => {
  //   "category": "Hh",
  //   "description": "Gsg",
  //   "hall": 3,
  //   "image": "file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FCanteenOrdering-4364bb58-ad0b-4618-9a70-4b2681dd850f/ImagePicker/fdd55107-0b87-400f-8128-9eac388765e9.jpg",
  //   "price": "23",
  //   "title": "Nkk",
  // }

  var userData = new FormData();
  userData.append("category", user.category);
  userData.append("description", user.description);
  userData.append("hall", user.hall);
  userData.append("price", user.price);
  userData.append("title", user.title);
  //userData.append("confirmPassword", user.confirmPassword);
  //userData.append("room", user.room);
  // userData.append("image", user.image);
  userData.append("image", {
    name: user.name + "image",
    type: "image/jpeg",
    uri: user.image,
  });

  return client.post(endpoint, userData);
};
export default {
  getFoodItems,
  addFoodListing,
  deleteListing,
  updateListing,
};
