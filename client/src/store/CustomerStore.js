import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";

const CustomerStore = create((set) => ({
  loading: false,

  //! create customer api
  customerCreateRequest: async (reqBody) => {
    try {
      set({ loading: true });
      let res = await axios.post(baseURL + "/customer-create", reqBody, {
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

  //! update customer by id
  customerUpdateByIdRequest: async (reqBody, id) => {
    try {
      let res = await axios.post(baseURL + "/update-customer/" + id, reqBody, {
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

  //! all customer api
  allCustomer: [],
  allCustomerRequest: async (perPage, pageNo) => {
    try {
      set({ loading: true });
      let res = await axios.get(
        baseURL + "/all-customers/" + perPage + "/" + pageNo,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.success === true) {
        set({ loading: false });
        set({ allCustomer: res?.data?.data });
      }
    } catch (e) {
      set({ loading: false });
      unAuthorize(e.status);
    }
  },

  //! customer details by id -- done
  customerDetailsByIdRequest: async (id) => {
    try {
      set({ loading: true });
      let res = await axios.get(baseURL + "/read-customer-by-id/" + id, {
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

  //! delete customer api
  deleteCustomerRequest: async (id) => {
    try {
      set({ loading: true });
      let res = await axios.delete(baseURL + "/delete-customer/" + id, {
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

export default CustomerStore;
