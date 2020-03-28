const connection = require("../database/connection"); //Importa a conexão para poder utilizar o banco de dados

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    //Retornará o total de casos
    const [count] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id") //Faz o JOIN com a tabela de incidents
      .limit(5) //Limita o nro de registros da consulta
      .offset((page - 1) * 5) //Diz de quantos em quantos deve avançar
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]);
    //Isso é para retornar os campos específicos, deve-se colocar eles separados como
    //elementos de array

    //É uma boa prática retornar totalizadores no header da response, para não confundir com
    //os dados que foram enviados na response
    response.header("X-Total-Count", count["count(*)"]);

    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body; //Pega os dados de forma desestruturizada, um dado em cada propriedade

    //Pega o ong_id do cabeçalho "authorization" do request
    const ong_id = request.headers.authorization;

    //O Await faz o Node aguardar a execução do código, antes de seguir adiante
    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id !== ong_id) {
      response.status(401).json({ error: "Operation not permitted." }); //Não Autorizado
    }

    await connection("incidents")
      .where("id", id)
      .delete();

    return response.status(204).send();
  }
};
