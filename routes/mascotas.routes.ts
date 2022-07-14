import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { getMascotas, getMascota, addMascota, updateMascota, deleteMascota } from "../controllers/MascotasController.ts";
import { authMiddleware } from "../middleware/auth.ts";

const router = new Router();

router.get('/api/v1/mascotas', getMascotas)
      .get("/api/v1/mascotas/:id", getMascota)
      .post('/api/v1/mascotas', addMascota)
      .put("/api/v1/mascotas/:id", updateMascota)
      .delete("/api/v1/mascotas/:id", authMiddleware, deleteMascota);

export default router;