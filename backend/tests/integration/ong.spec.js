const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  //Faz com que seja executado os migrations na base de teste, antes de cada teste
  //Antes, é feito rollback pra limpar a base e depois atualizado com os migrations
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  //Faz com que a conexão do banco seja encerrada após a execução de TODOS os testes descritos
  afterAll(async () => {
    await connection.destroy();
  });

  //Teste de criação de ong
  it("sould be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "APAD3",
        email: "contato@apad3.com.br",
        whatsapp: "51984571972",
        city: "Rio do Sul",
        uf: "SC"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
