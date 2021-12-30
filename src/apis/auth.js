import Base from "./base";

class Auth extends Base {
  async login(user) {
    const response = await this.post("/login", user);
    if (response.status !== 200) {
      return "error";
    }
    localStorage.setItem("token", response.data.objModel.token);
    return response.data.objModel.token;
  }
  async getMe() {
    try {
      const response = await this.get("/login/me");
      return response.data;
    } catch (error) {
      throw new Error("Hubo un error obteniendo los datos del usuario");
    }
  }
}

export default Auth;
