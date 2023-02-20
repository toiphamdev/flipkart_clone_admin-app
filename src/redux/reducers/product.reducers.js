import { productConstants } from "../constants";

const initState = {
  error: null,
  message: "",
  loading: false,
  products: [],
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS: {
      let coppyState = {
        ...state,
        products: action.payload.products,
      };
      return coppyState;
    }
    case productConstants.CREATE_PRODUCT_REQUEST: {
      let coppyState = {
        ...state,
        loading: true,
      };
      return coppyState;
    }
    case productConstants.CREATE_PRODUCT_SUCCESS: {
      let coppyState = {
        ...state,
        loading: false,
        products: [...state.products, action.payload.product],
      };
      return coppyState;
    }
    case productConstants.CREATE_PRODUCT_FAILURE: {
      let coppyState = {
        ...state,
        loading: false,
      };
      return coppyState;
    }
    case productConstants.DELETE_PRODUCT_REQUEST: {
      let coppyState = {
        ...state,
        loading: true,
      };
      return coppyState;
    }
    case productConstants.DELETE_PRODUCT_SUCCESS: {
      let coppyState = {
        ...state,
        loading: false,
      };
      return coppyState;
    }
    case productConstants.DELETE_PRODUCT_FAILURE: {
      let coppyState = {
        ...state,
        loading: false,
      };
      return coppyState;
    }
    default:
      break;
  }
  return state;
};

export default productReducer;
