import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";
import LoadingStore from "./LoadingStore";
const { loadingRequest } = LoadingStore.getState();
const OrderStore = create((set) => ({
  //! create order api
  orderCreateRequest: async (reqBody) => {
    try {
      loadingRequest(true);
      let res = await axios.post(baseURL + "/orders-create", reqBody, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        loadingRequest(false);
        SuccessToast(res?.data?.message);
        return true;
      } else {
        loadingRequest(false);
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! cancel order by id
  cancelOrderByIdRequest: async (reqBody) => {
    try {
      loadingRequest(true);
      let res = await axios.post(baseURL + "/orders-cancel/", reqBody, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        loadingRequest(false);
        SuccessToast(res?.data?.message);
        return true;
      } else {
        loadingRequest(false);
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! return order by id
  returnOrderByIdRequest: async (reqBody) => {
    try {
      loadingRequest(true);
      let res = await axios.post(baseURL + "/orders-return", reqBody, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        loadingRequest(false);
        SuccessToast(res?.data?.message);
        return true;
      } else {
        loadingRequest(false);
        ErrorToast(res?.data?.message);
        return false;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! all order api
  allOrder: [],
  allOrderRequest: async (perPage, pageNo) => {
    try {
      loadingRequest(true);
      let res = await axios.get(
        baseURL + "/all-orders/" + perPage + "/" + pageNo,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success === true) {
        loadingRequest(false);
        set({ allOrder: res?.data?.data });
        return res?.data?.data;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! order details by id
  orderDetailsByIdRequest: async (id) => {
    try {
      loadingRequest(true);
      let res = await axios.get(baseURL + "/read-order-by-id/" + id, {
        withCredentials: true,
      });
      if (res?.data?.success === true) {
        loadingRequest(false);
        return res?.data?.data;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },


}));

export default OrderStore;
