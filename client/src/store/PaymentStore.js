import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";
import LoadingStore from "./LoadingStore";
const { loadingRequest } = LoadingStore.getState();
const PaymentStore = create((set) => ({
  //! create payment api
  paymentCreateRequest: async (reqBody) => {
    try {
      loadingRequest(true);
      let res = await axios.post(baseURL + "/payments-create", reqBody, {
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

export default PaymentStore;
