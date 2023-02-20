import { default as axios } from "../../helpers/axios";
import { productConstants } from "../constants";
import { getInitialData } from "./initialData.actions";

export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.CREATE_PRODUCT_REQUEST });
      const res = await axios.post("/product/create", form);
      if (res.status === 201) {
        dispatch({
          type: productConstants.CREATE_PRODUCT_SUCCESS,
          payload: { product: res.data.product },
        });
      } else {
        dispatch({
          type: productConstants.CREATE_PRODUCT_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProductById = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST });
      const res = axios.post("/product/delete-product-by-id", {
        productId: _id,
      });
      if (res.status === 202) {
        dispatch({ type: productConstants.DELETE_PRODUCT_SUCCESS });
        getInitialData();
      } else {
        dispatch({
          type: productConstants.DELETE_PRODUCT_FAILURE,
          payload: { error: (await res).data.error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
