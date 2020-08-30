import client from "./client";

const endpoint = "admin/menu";

const getFoodItems = (hallNum = "") => client.get(endpoint + "/" + hallNum);
const deleteListing = (id) => client.delete(endpoint + "/" + id);
const updateListing = (id, item) => client.put(endpoint + "/" + id, item);
const addFoodListing = (foodListing) => {
  //   "category": "Hh",
  //   "description": "Gsg",
  //   "hall": 3,
  //   "price": "23",
  //   "title": "Nkk",
  //   "image": "file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FCanteenOrdering-4364bb58-ad0b-4618-9a70-4b2681dd850f/ImagePicker/fdd55107-0b87-400f-8128-9eac388765e9.jpg",
  // }

  var listingData = new FormData();
  listingData.append("category", foodListing.category);
  listingData.append("description", foodListing.description);
  listingData.append("hall", foodListing.hall);
  listingData.append("price", foodListing.price);
  listingData.append("title", foodListing.title);
  listingData.append("image", {
    name: foodListing.name + "image",
    type: "image/jpeg",
    uri: foodListing.image,
  });

  return client.post(endpoint, listingData);
};
export default {
  getFoodItems,
  addFoodListing,
  deleteListing,
  updateListing,
};
