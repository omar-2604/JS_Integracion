const payasosService = require("../src/service/payasosService");
const db = require("../src/repository/payasosRepository");

describe("TEST 2: Service ↔ Repository", () => {
  beforeAll(async () => { await db.init(); });
  beforeEach(async () => { await db.clear(); });
  afterAll(async () => { await db.close(); });

  test("El Service utiliza el Repository para guardar un payaso", async () => {
    // 1. Guardamos usando el Service
    const guardado = await payasosService.registerPayaso("Bofó", "bofo@circo.com", "Agua");
    
    // 2. Verificamos que el Repository lo puede encontrar
    const encontrado = await db.findPayasoByEmail("bofo@circo.com");
    
    expect(guardado.id).toBeDefined();
    expect(encontrado).not.toBeNull();
    expect(encontrado.arma).toBe("Agua");
  });
});