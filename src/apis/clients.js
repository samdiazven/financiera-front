import Base from "./base";
import Axios from "./axios";

class Clients extends Base {
  async getClients() {
    try {
      const response = await this.get("person/clientList");
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error obteniendo los clientes", error);
    }
  }
  async createClient(data) {
    try {
      const response = await this.post("/person", data);
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error creando los cliente", error);
    }
  }
  async updateClient(data) {
    const response = await this.put("/person", data);
    return response.data;
  }
  async desactiveClient(id) {
    try {
      const response = await this.put(`/person/changeClientState/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error eliminando el cliente", error);
    }
  }
  async uploadFile(data) {
    try {
      const body = new FormData();
      const bodyToSend = Object.entries(data).map((obj) => {
        let [key, value] = obj;
        return { key, value };
      });
      for (let i = 0; i < bodyToSend.length; i++) {
        body.append(bodyToSend[i].key, bodyToSend[i].value);
      }
      const uploadData = await Axios.post(`/person/uploadSentinelPdf`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          type: "formData",
        },
      });
      return uploadData.data.objModel;
    } catch (error) {
      console.log(error);
      throw new Error("Hubo un error subiendo el archivo", error);
    }
  }

  async getFullClient(id) {
    try {
      const response = await this.get(`/person/fullInformation/${id}`);
      return response.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error obteniendo el cliente", error);
    }
  }

  async validateDocumentNumber(number) {
    try {
      const response = await this.get(`/person/check/${number}`);
      return response.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error validando el documento", error);
    }
  }

  async getFiles(id) {
    try {
      const response = await this.get(`/person/historicalSentinelReport/${id}`);
      return response.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error obteniendo los archivos", error);
    }
  }
}

export default Clients;
