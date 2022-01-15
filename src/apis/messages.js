import Base from "./base";

class Messages extends Base {
  async getMessages() {
    try {
      const messages = await this.get("/message");
      return messages.data.objModel || [];
    } catch (error) {
      throw new Error("Hubo un error obteniendo los mensajes", error);
    }
  }
  async createMessage(data) {
    try {
      const message = await this.post("/message", data);
      return message.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error creando el mensaje", error);
    }
  }

  async updateMessage(data) {
    try {
      const message = await this.put("/message", data);
      return message.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error actualizando el mensaje", error);
    }
  }

  async deleteMessage(id) {
    try {
      const message = await this.delete(`/message/${id}`);
      return message.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error eliminando el mensaje", error);
    }
  }

  async sendSmsToGroup(data) {
    try {
      const message = await this.post("/SMS/sendNotificationToGroup", data);
      return message.data.objModel;
    } catch (error) {
      throw new Error("Hubo un error enviando el mensaje", error);
    }
  }
}

export default Messages;
