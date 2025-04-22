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

app.use(cookieParser("NXwp0DZG1R"));

app.use(express.json());

//Understand this return next
app.use((req, res, next) => {
  if (unauthPaths.includes(req.path)) {
    console.log("No auth");
    return next();
  }
  auth(req, res, next);
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
