import  mysql2  from "mysql2/promise";
import { DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE,DB_PORT,PORT } from "./config.js";


export const pool =mysql2.createPool({
    host: DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_DATABASE,


})