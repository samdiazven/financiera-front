import Base from "./base";

class Clients extends Base {
  async getClients() {
    try {
      const response = await this.get("/clients");
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error obteniendo los clientes", error);
    }
  }
  async createClient(data) {
    try {
      const response = await this.post("/clients", data);
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error creando los cliente", error);
    }
  }
  async updateClient(data) {
    const response = await this.put("/clients", data);
    return response.data;
  }
  async deleteClient(id) {
    try {
      const response = await this.delete(`/clients/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error eliminando el cliente", error);
    }
  }
}

export default Clients;
