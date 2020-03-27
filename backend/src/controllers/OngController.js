const connection = require("../database/connection"); //Importa a conexão para poder utilizar o banco de dados
const crypto = require("crypto"); //Importa o pacote crypto, disponíve no Node

module.exports = {
  async index(request, response) {
    const ongs = await connection("ongs").select("*");

    return response.json(ongs);
  },

  async create(request, response) {
    // const data = request.body; //Pega o valor completo em uma variável, formato JSON
    const { name, email, whatsapp, city, uf } = request.body; //Pega os dados de forma desestruturizada, um dado em cada propriedade

    //Gera 4 bytes de caracteres hexadecimais aleatórios
    const id = crypto.randomBytes(4).toString("HEX");

    //O Await faz o Node aguardar a execução do código, antes de seguir adiante
    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return response.json({ id });
  }
};
