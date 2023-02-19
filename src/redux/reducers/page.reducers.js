import { pageConstans } from "../constants";

const initState = {
  error: null,
  message: "",
  loading: false,
  page: {},
};

const pageReducer = (state = initState, action) => {
  switch (action.type) {
    case pageConstans.CREATE_PAGE_REQUEST: {
      const stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }
    case pageConstans.CREATE_PAGE_SUCCESS: {
      const stateCoppy = {
        ...state,
        page: action.payload.page,
        loading: false,
      };
      return stateCoppy;
    }
    case pageConstans.CREATE_PAGE_FAILURE: {
      const stateCoppy = {
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

export default pageReducer;
