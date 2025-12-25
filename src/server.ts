import express, { Request, Response } from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "Hello World" });
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
