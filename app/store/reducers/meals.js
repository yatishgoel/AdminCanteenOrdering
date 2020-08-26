import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_FROM_OTHER_HALL,
  RESET_CART,
} from "../actions/mealsaction";

const initialstate = {
  cart: [],
  hall: null,
};
const mealsReducer = (state = initialstate, action) => {
  let existingIndex = 0;
  let updatedCart = [];

  switch (action.type) {
    case ADD_TO_CART:
      existingIndex = state.cart.findIndex(
        (meal) => meal._id == action.foodItem._id
      );
      if (existingIndex !== -1) return { ...state };
      const newItem = action.foodItem;
      newItem["quantity"] = 1;
      return {
        ...state,
        cart: state.cart.concat(newItem),
        hall: newItem.hall,
      };

    case DECREASE_QUANTITY:
      existingIndex = state.cart.findIndex(
        (meal) => meal._id === action.mealId
      );
      updatedCart = [...state.cart];
      updatedCart[existingIndex].quantity -= 1;
      return { ...state, cart: updatedCart };

    case INCREASE_QUANTITY:
      existingIndex = state.cart.findIndex(
        (meal) => meal._id === action.mealId
      );
      updatedCart = [...state.cart];
      updatedCart[existingIndex].quantity += 1;
      return { ...state, cart: updatedCart };

    case REMOVE_FROM_CART:
      existingIndex = state.cart.findIndex(
        (meal) => meal._id === action.mealId
      );
      updatedCart = [...state.cart];
      updatedCart.splice(existingIndex, 1);
      if (updatedCart.length == 0) {
        return { ...state, cart: updatedCart, hall: null };
      } else {
        return { ...state, cart: updatedCart };
      }
    case ADD_FROM_OTHER_HALL:
      action.foodItem.quantity = 1;
      updatedCart = [action.foodItem];
      return { ...state, cart: updatedCart, hall: action.foodItem.hall };

    case RESET_CART:
      return {
        cart: [],
        hall: null,
      };
    default:
      return state;
  }
};

export default mealsReducer;
