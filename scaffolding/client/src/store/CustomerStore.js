import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";
import LoadingStore from "./LoadingStore";
const { loadingRequest } = LoadingStore.getState();
const CustomerStore = create((set) => ({
  //! create customer api
  customerCreateRequest: async (reqBody) => {
    try {
      loadingRequest(true);
      let res = await axios.post(baseURL + "/customer-create", reqBody, {
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

  //! update customer by id
  customerUpdateByIdRequest: async (reqBody, id) => {
    try {
      loadingRequest(true);
      let res = await axios.post(baseURL + "/update-customer/" + id, reqBody, {
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

  //! all customer api
  allCustomer: [],
  allCustomerRequest: async (perPage, pageNo) => {
    try {
      loadingRequest(true);
      let res = await axios.get(
        baseURL + "/all-customers/" + perPage + "/" + pageNo,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success === true) {
        loadingRequest(false);
        set({ allCustomer: res?.data?.data });
        return res?.data?.data;
      }
    } catch (e) {
      loadingRequest(false);
      unAuthorize(e.status);
    }
  },

  //! customer details by id -- done
  customerDetailsByIdRequest: async (id) => {
    try {
      loadingRequest(true);
      let res = await axios.get(baseURL + "/read-customer-by-id/" + id, {
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

  //! delete customer api
  deleteCustomerRequest: async (id) => {
    try {
      loadingRequest(true);
      let res = await axios.delete(baseURL + "/delete-customer/" + id, {
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

export default CustomerStore;
