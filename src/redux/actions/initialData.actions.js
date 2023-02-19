import { default as axios } from "../../helpers/axios";
import {
  categoryConstans,
  orderConstants,
  productConstants,
} from "../constants";

export const getInitialData = () => {
  return async (dispatch) => {
    // dispatch({type: initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST})
    const res = await axios.get("/initialdata");
    if (res.status === 200) {
      const { categories, products, orders } = res.data;
      dispatch({
        type: categoryConstans.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
    } else {
    }
    console.log(res);
  };
};
