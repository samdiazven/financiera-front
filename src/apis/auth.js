import Base from "./base";

class Auth extends Base {
  async login(user) {
    try {
      const response = await this.post("/login", user);
      localStorage.setItem("token", response.data.objModel.token);
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error al iniciar sesión");
    }
  }
  async getMe() {
    try {
      const response = await this.get("/me");
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error obteniendo los datos del usuario");
    }
  }
}

export default Auth;
