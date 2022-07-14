import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { getUsers, loginUser } from '../controllers/UserController.ts';

const router = new Router();
router.get('/api/v1/users', getUsers)
      .post("/api/v1/users/login", loginUser)

export default router;