export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const ADD_FROM_OTHER_HALL = "ADD_FROM_OTHER_HALL";
export const RESET_CART = "RESET_CART";

export const addToCart = (item) => {
  return { type: ADD_TO_CART, foodItem: item };
};

export const addFromOtherHall = (item) => {
  return { type: ADD_FROM_OTHER_HALL, foodItem: item };
};

export const removeFromCart = (id) => {
  return { type: REMOVE_FROM_CART, mealId: id };
};

export const increaseQuantity = (id) => {
  return { type: INCREASE_QUANTITY, mealId: id };
};

export const decreaseQuantity = (id) => {
  return { type: DECREASE_QUANTITY, mealId: id };
};

export const resetCart = () => {
  return { type: RESET_CART };
};
