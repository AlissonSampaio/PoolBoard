import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./database/data-source";
import { routes } from "./routes";
import cors from "cors";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
 
const app = express();

app.use(express.json());

app.use(routes);

app.use(cors());

app.listen(666, ()=> {
    console.log("Server startou nessa porra");
});