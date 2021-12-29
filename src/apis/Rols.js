import Base from "./base";

class Rols extends Base {
  async getRols() {
    try {
      const response = await this.get("/rol/rolWithPermissions");
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error al iniciar sesión", error);
    }
  }
  async createRol(data) {
    try {
      const response = await this.post("/rol", data);
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error creando los roles", error);
    }
  }
  async updateRol(data) {
    try {
      const response = await this.put("/rol", data);
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error actualizando los roles", error);
    }
  }
  async deleteRol(id) {
    try {
      const response = await this.delete(`/rol/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error eliminando el rol", error);
    }
  }
}

export default Rols;
