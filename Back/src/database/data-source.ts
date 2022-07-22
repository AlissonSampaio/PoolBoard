import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "poolboard",
    entities: ["src/entities/*.{js,ts}"],
    migrations:["src/database/migrations/*.ts"],
    logging: true,
    synchronize: true
})