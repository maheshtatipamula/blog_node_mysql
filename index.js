const express = require("express");
const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/dbConnect");
const mysql = require("mysql");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5005;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
// app.use("/static", express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan());

app.use("/api/user", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
