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

const corsOptions = () => {
    const allowList = String("http://192.168.100.117:3000,http://localhost:3000,http://http://172.16.3.50:3000/")
        .split(',')
        .map(domain => domain.trim());

    return  {
        origin: function (origin: any, callback: Function) {
            if (allowList.indexOf(origin) !== -1 || !origin) {
                return callback(null, true)
            }
            return callback(new Error('Not allowed by CORS'));
        },
        exposedHeaders: 'Date',
      }
}

app.use(express.json());

app.use(cors());

app.options('*', cors(corsOptions));

app.use(routes);

app.listen(666, ()=> {
    console.log("Server started");
});