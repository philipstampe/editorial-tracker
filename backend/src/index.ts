import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { auth } from "./auth";
import routes from "./routes";

const app = express();
const port = 3001;
const unauthPaths = ["/api/login", "/api/logout"];

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

/* Note:
  Here for demostration purpose.
  Salt should come from ENV file
*/
app.use(cookieParser("NXwp0DZG1R"));

app.use(express.json());

app.use((req, res, next) => {
  if (unauthPaths.includes(req.path)) {
    next();
    return;
  }
  auth(req, res, next);
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
