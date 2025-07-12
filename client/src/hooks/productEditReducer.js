export const initialState = {
  id: "",
  name: "",
  brand: "",
  price: "",
  inventory: "",
  description: "",
  category: "",
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};