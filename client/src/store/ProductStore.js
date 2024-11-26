import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";
import LoadingStore from "./LoadingStore";
const { loadingRequest } = LoadingStore.getState();
const ProductStore = create((set) => ({
  //! create product api
  productCreateRequest: async (reqBody) => {
    try {
      loadingRequest(true);
      let res = await axios.post(baseURL + "/create-product", reqBody, {
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

  //! update product by id
  productUpdateByIdRequest: async (reqBody, id) => {
    try {
      loadingRequest(true);
      let res = await axios.post(baseURL + "/update-product/" + id, reqBody, {
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

  //! all product api
  allProduct: [],
  allProductRequest: async (perPage, pageNo) => {
    try {
      loadingRequest(true);
      let res = await axios.get(
        baseURL + "/read-product/" + perPage + "/" + pageNo,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success === true) {
        loadingRequest(false);
        set({ allProduct: res?.data?.data });
        return res?.data?.data;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! product details by id -- done
  productDetailsByIdRequest: async (id) => {
    try {
      loadingRequest(true);
      let res = await axios.get(baseURL + "/read-product-by-id/" + id, {
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

  //! delete product api
  deleteProductRequest: async (id) => {
    try {
      loadingRequest(true);
      let res = await axios.delete(baseURL + "/delete-product/" + id, {
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
}));

export default ProductStore;
