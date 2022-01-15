import Base from "./base";

class Loan extends Base {
  async getLoans() {
    try {
      const loans = await this.get("/loan");
      return loans.data.objModel || [];
    } catch (error) {
      throw new Error("Hubo un error obteniendo los prestamos", error);
    }
  }
  async createLoan(data) {
    try {
      const loan = await this.post("/loan", data);
      return loan.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error creando el prestamo", error);
    }
  }
  async updateLoan(data) {
    try {
      const loan = await this.put("/loan", data);
      return loan.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error actualizando el prestamo", error);
    }
  }
  async getFullLoan(id) {
    try {
      const res = await this.get(`/loan/fullInformation/${id}`);
      return res.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error obteniendo el prestamo", error);
    }
  }
}

export default Loan;
