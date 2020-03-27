const connection = require("../database/connection"); //Importa a conexão para poder utilizar o banco de dados

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection("ongs")
      .where("id", id)
      .select("name")
      .first();

    if (!ong) {
      response.status(400).json({ error: "No ONG found with this ID." }); //Não Encontrado
    }

    return response.json(ong);
  }
};
