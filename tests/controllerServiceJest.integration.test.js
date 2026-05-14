const request = require("supertest");
const { app } = require("../src/controller/payasosController"); 
const db = require("../src/repository/payasosRepository");

describe("TEST 1: Controller ↔ Service", () => {
  beforeAll(async () => { await db.init(); });
  beforeEach(async () => { await db.clear(); });
  afterAll(async () => { await db.close(); });

  test("El Controller llama al Service al hacer un GET y devuelve 200", async () => {
    const respuesta = await request(app).get("/payasos");
    expect(respuesta.statusCode).toBe(200);
    expect(Array.isArray(respuesta.body)).toBe(true);
  });

  test("El Controller pasa los datos al Service en un POST y devuelve 201", async () => {
    const nuevo = { name: "Plim Plim", email: "plim@circo.com", arma: "Magia" };
    const respuesta = await request(app).post("/payasos").send(nuevo);
    
    expect(respuesta.statusCode).toBe(201);
    expect(respuesta.body.name).toBe("Plim Plim");
  });
});