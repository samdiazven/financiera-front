import Base from "./base";

class Dashboard extends Base {
  async getDataCards() {
    try {
      const data = await this.get("/dashboard");
      return data.data.objModel;
    } catch (error) {
      throw new Error(
        "Hubo un error obteniendo los datos de las tarjetas",
        error
      );
    }
  }
}

export default Dashboard;
