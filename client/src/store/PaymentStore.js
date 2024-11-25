import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";
import { ErrorToast, SuccessToast, unAuthorize } from "../helper/helper";

const PaymentStore = create((set) => ({
  loading: false,

  //! create payment api
  paymentCreateRequest: async (reqBody) => {
    try {
      set({ loading: true });
      let res = await axios.post(baseURL + "/payments-create", reqBody, {
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

export default PaymentStore;
