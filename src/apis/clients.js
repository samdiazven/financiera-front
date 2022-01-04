import Base from "./base";

class Clients extends Base {
  async getClients() {
    try {
      const response = await this.get("/client");
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error obteniendo los clientes", error);
    }
  }
  async createClient(data) {
    try {
      const response = await this.post("/client", data);
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error creando los cliente", error);
    }
  }
  async updateClient(data) {
    const response = await this.put("/client", data);
    return response.data;
  }
  async desactiveClient(id) {
    try {
      const response = await this.put(`/client/desactive/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error eliminando el cliente", error);
    }
  }
}

export default Clients;
