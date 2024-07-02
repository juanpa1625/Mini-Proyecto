import { PORT } from "./config.js";
import { pool } from "./db.js";
import http, { request } from 'node:http'


const server = http.createServer((request, Response)=>{

})

server.listen(PORT, ()=>console.log(`servidor en http://localhost:${PORT}`))
