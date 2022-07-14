import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import routerMascotas from "./routes/mascotas.routes.ts";
import routerUsers from "./routes/user.routes.ts";


const env = Deno.env.toObject();
const PORT = env.PORT || 8080;
const HOST = env.HOST || '0.0.0.0';

const app = new Application

app.use(routerUsers.routes());
app.use(routerUsers.allowedMethods());

app.use(routerMascotas.routes());
app.use(routerMascotas.allowedMethods());

console.log(`Server running on port: ${PORT}`);
app.listen(`${ HOST }:${ PORT }`);