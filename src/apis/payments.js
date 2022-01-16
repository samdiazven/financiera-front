import Base from "./base";
import Axios from "./axios";

class Payments extends Base {
  async uploadPayments(data) {
    try {
      const body = new FormData();
      const bodyToSend = Object.entries(data).map((obj) => {
        let [key, value] = obj;
        return { key, value };
      });
      for (let i = 0; i < bodyToSend.length; i++) {
        body.append(bodyToSend[i].key, bodyToSend[i].value);
      }
      const payments = await Axios.post(`/payment`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          type: "formData",
        },
      });
      return payments.data.objModel;
    } catch (error) {
      console.log(error);
      throw new Error("Hubo un error subiendo los pagos", error);
    }
  }

  async getPayments(idLoan) {
    try {
      const payments = await Axios(`/payment/${idLoan}`);
      return payments.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error obteniendo los pagos", error);
    }
  }

  async getBanks() {
    try {
      const banks = await Axios(`/bank`);
      return banks.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error obteniendo los bancos", error);
    }
  }
}

export default Payments;
