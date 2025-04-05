const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/connection");
const userRouter = require("./route/user");
const bookRouter = require("./route/book");
const favouriteRouter = require("./route/favourite");
const cartRouter = require("./route/cart");
const orderRouter = require("./route/order");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/v1",userRouter);
app.use("/api/v1",bookRouter);
app.use("/api/v1/",favouriteRouter);
app.use("/api/v1/",cartRouter);
app.use("/api/v1",orderRouter);

const port = process.env.PORT || 2000;

app.listen(port,()=>{
    console.log(`server is started at ${process.env.PORT}`);
})
