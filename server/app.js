import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorMiddleware from "./middleware/error.middleware.js";
import portfolioRouter from "./routes/portfolio.routes.js";
import catalogueRouter from "./routes/catalgoue.routes.js";
import adminRouter from "./routes/admin.routes.js";
import authRouter from "./routes/auth.routes.js";
import session from "express-session";
import { catalogueCrone, portfolioCrone } from "./croneJobs/portfolioCrone.js";

config();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://www.profilegenie.in",
      "https://profilegenie.in",
      process.env.FRONTEND_URL,
      process.env.CATALOGUE_ADMIN_URL,
      process.env.ADMIN_URL,
    ],
    credentials: true,
  })
);

portfolioCrone();
catalogueCrone();

app.use(
  session({
    secret: "your-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    },
  })
);

app.use(morgan("dev"));

app.use("/ping", function (req, res) {
  res.send("/pong");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/portfolio", portfolioRouter);
app.use("/api/v1/catalogue", catalogueRouter);
app.use("/api/v1/admin", adminRouter);

app.all("*", (req, res) => {
  res.status(404).send("OOPS! 404 Page not found");
});

app.use(errorMiddleware);

export default app;
