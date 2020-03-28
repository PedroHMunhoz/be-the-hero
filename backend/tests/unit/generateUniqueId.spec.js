const generateUniqueId = require("../../src/utils/generateUniqueId");

//Os parâmetros são Nome do Teste e uma arrow function com o que deve testar
describe("Generate Unique ID", () => {
  it("should generate an unique ID", () => {
    const id = generateUniqueId();
    expect(id).toHaveLength(8);
  });
});
