const request = require("supertest");
// Importamos tu app de express (asegúrate de exportarla en tu archivo controller)
const { app } = require("../src/controller/payasosController"); 
const db = require("../src/repository/payasosRepository");

describe("Pruebas de Integración TOTAL (API -> Service -> DB)", () => {
  
  beforeAll(async () => await db.init());
  beforeEach(async () => await db.clear());
  afterAll(async () => await db.close());

  test("POST /payasos debería crear un payaso y devolver 201", async () => {
    const nuevoPayaso = { name: "Jose", email: "josito@gmail.com", arma: "Cantar" };

    const response = await request(app)
      .post("/payasos")
      .send(nuevoPayaso);

    // Aquí comprobamos el Controller
    expect(response.status).toBe(201);
    // Aquí comprobamos que el Service y DB hicieron su trabajo
    expect(response.body.name).toBe("Jose");
    expect(response.body).toHaveProperty("id");
  });

  test("POST /payasos debería devolver 400 si el email ya existe", async () => {
    // 1. Guardamos uno primero
    await request(app).post("/payasos").send({ name: "Pipo", email: "pipo@mail.com" });

    // 2. Intentamos repetir email
    const response = await request(app)
      .post("/payasos")
      .send({ name: "Otro", email: "pipo@mail.com" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("El payaso ya está registrado con ese email");
  });
});