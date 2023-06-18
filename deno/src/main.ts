import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { handleRequest } from "./api/movements/validation/post.ts";

const router = new Router();
router
  .post("/movements/validation", handleRequest)

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => console.log(`Listening on ${hostname}:${port}`))

await app.listen({ port: 3000 });
