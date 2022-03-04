import Base from "./base";
import axios from "axios";
import { url } from "./constants";

class Investments extends Base {
  getToken() {
    return localStorage.getItem("token");
  }
  async getInvestments() {
    try {
      const response = await axios.get(`${url}/investment`, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error al obtener data", error);
    }
  }
  async createInvestment(data) {
    try {
      const response = await axios.post(`${url}/investment`, data, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error creando las inversiones", error);
    }
  }
  async updateInvestment(data) {
    try {
      const response = await axios.put(`${url}/investment`, data, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error actualizando los roles", error);
    }
  }
  async deleteInvestment(id) {
    try {
      const response = await axios.delete(`${url}/investment/${id}`, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error eliminando el rol", error);
    }
  }
}

export default Investments;
