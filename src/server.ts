import { Hono } from "hono";
import { z } from "zod";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serveStatic } from "hono/cloudflare-workers";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

const schema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

type Post = z.infer<typeof schema>;

const posts: Post[] = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
  {
    userId: 1,
    id: 6,
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    completed: false,
  },
  {
    userId: 1,
    id: 7,
    title: "illo expedita consequatur quia in",
    completed: false,
  },
  {
    userId: 1,
    id: 8,
    title: "quo adipisci enim quam ut ab",
    completed: true,
  },
  {
    userId: 1,
    id: 9,
    title: "molestiae perspiciatis ipsa",
    completed: false,
  },
  {
    userId: 1,
    id: 10,
    title: "illo est ratione doloremque quia maiores aut",
    completed: true,
  },
];

const route = app
  .use(logger())
  .use(
    "*",
    cors({
      origin: "*",
      allowMethods: ["HEAD", "PUT", "POST", "DELETE", "PATCH"],
      maxAge: 600,
      credentials: false,
    })
  )
  .get("/*", serveStatic({ root: "./" }))
  .get("/post/all", (c) => c.json(posts))
  .post("/post/submit", zValidator("json", schema), (c) => {
    const post = c.req.valid("json");
    posts.push(post);
    return c.json({
      message: "created!",
    });
  });

export type AppType = typeof route;

export default app;
