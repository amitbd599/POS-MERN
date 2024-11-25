import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";

const OrderStore = create((set) => ({
  loading: false,

  //! create order api
  orderCreateRequest: async (reqBody) => {
    try {
      set({ loading: true });
      let res = await axios.post(baseURL + "/orders-create", reqBody, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        set({ loading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ loading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
    }
  },

  //! cancel order by id
  cancelOrderByIdRequest: async (reqBody) => {
    try {
      let res = await axios.post(baseURL + "/orders-cancel/", reqBody, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        set({ loading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ loading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
    }
  },

  //! return order by id
  returnOrderByIdRequest: async (reqBody) => {
    try {
      let res = await axios.post(baseURL + "/orders-return", reqBody, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        set({ loading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ loading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
    }
  },

  //! all order api
  allOrder: [],
  allOrderRequest: async (perPage, pageNo) => {
    try {
      set({ loading: true });
      let res = await axios.get(
        baseURL + "/all-orders/" + perPage + "/" + pageNo,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success === true) {
        set({ loading: false });
        set({ allOrder: res?.data?.data });
        return res?.data?.data;
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
    }
  },

  // product details by id -- done
  productDetailsByIdRequest: async (id) => {
    try {
      set({ loading: true });
      let res = await axios.get(baseURL + "/read-product-by-id/" + id, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        set({ loading: false });
        return res?.data?.data;
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
    }
  },

  // delete product api
  deleteProductRequest: async (id) => {
    try {
      set({ loading: true });
      let res = await axios.delete(baseURL + "/delete-product/" + id, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        set({ loading: false });
        SuccessToast(res?.data?.message);
        return true;
      } else {
        set({ loading: false });
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
    }
  },
}));

export default OrderStore;
