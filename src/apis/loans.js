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
  async getClientsByLoan(id) {
    try {
      const res = await this.get(`/person/byIdLoan/${id}`);
      return res.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error obteniendo los clientes", error);
    }
  }

  async addUserToLoan(data) {
    try {
      await this.post("/person/addToLoanList", data);
    } catch (error) {
      throw new Error("Hubo un error agregando el usuario", error);
    }
  }

  async removeUserFromLoan(idClient, idLoan) {
    try {
      await this.delete(`/person/fromLoan/${idClient}/${idLoan}`);
    } catch (error) {
      throw new Error("Hubo un error removiendo el usuario", error);
    }
  }
}

export default Loan;
