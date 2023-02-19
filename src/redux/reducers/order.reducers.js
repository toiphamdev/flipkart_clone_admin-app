import { orderConstants } from "../constants";

const initState = {
  error: null,
  orders: [],
  message: "",
  loading: false,
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_REQUEST: {
      let stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS: {
      let stateCoppy = {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };
      return stateCoppy;
    }
    case orderConstants.GET_CUSTOMER_ORDER_FAILURE: {
      let stateCoppy = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return stateCoppy;
    }
    default:
      break;
  }
  return state;
};

export default orderReducer;
