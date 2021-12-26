import Axios from "./axios";

class Base {
  async post(endpoint, data) {
    return await Axios.post(`${endpoint}`, data);
  }
  async get(endpoint) {
    return await Axios.get(`${endpoint}`);
  }
  async put(endpoint, data) {
    return await Axios.put(`${endpoint}`, data);
  }
}
export default Base;
