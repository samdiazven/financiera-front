import Base from "./base";

class Auth extends Base {
  async login(user) {
    const response = await this.post("/login", user);
    if (response.data.status !== 1) {
      return "error";
    }
    localStorage.setItem("token", response.data.objModel.token);
    return response.data.objModel.token;
  }
  async getMe() {
    try {
      const response = await this.get("/login/me");
      return response.data.objModel || null;
    } catch (error) {
      return null;
    }
  }
}

export default Auth;
