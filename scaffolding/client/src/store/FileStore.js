import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helper/config";

const FileStore = create((set) => ({
  uploadFileRequest: async (file) => {
    let result = await axios.post(`${baseURL}/file-upload`, file, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (result.data.status === true) {
      return result;
    } else {
      return false;
    }
  },
}));

export default FileStore;
