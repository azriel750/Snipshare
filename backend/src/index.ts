import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import snippetRouter from "./routes/snippets";
import routes from "./routes";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Backend SnipShare en écoute sur http://localhost:${PORT}`);
});
