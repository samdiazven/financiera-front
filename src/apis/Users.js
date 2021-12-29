import Base from "./base";

class Users extends Base {
  async getUsers() {
    try {
      const response = await this.get("/users");
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error obteniendo los usuarios", error);
    }
  }
  async createUser(data) {
    try {
      const response = await this.post("/users", data);
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error creando los usuarios", error);
    }
  }
  async updateUser(data) {
    try {
      const response = await this.put("/users", data);
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error actualizando los usuarios", error);
    }
  }
  async deleteUser(id) {
    try {
      const response = await this.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error eliminando el usuario", error);
    }
  }
}

export default Users;
