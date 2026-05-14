const db = require("../src/repository/payasosRepository");

describe("TEST 3: Repository ↔ Base de Datos (SQLite)", () => {
  beforeAll(async () => { await db.init(); });
  beforeEach(async () => { await db.clear(); });
  afterAll(async () => { await db.close(); });

  test("El Repository ejecuta el INSERT y SQLite genera un ID numérico", async () => {
    const datos = { name: "Tatín", email: "tatin@circo.com", arma: "Zapatos" };
    
    const resultado = await db.savePayaso(datos);
    
    // Si la base de datos funciona, devuelve un ID automático que es un número
    expect(resultado).toHaveProperty("id");
    expect(typeof resultado.id).toBe("number");
  });
});