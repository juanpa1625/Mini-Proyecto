import { PORT } from "./config.js";
import http from 'node:http'
import  fs  from "node:fs/promises";
import { ruta1, ruta2 } from './controller.js';


const server = http.createServer(async(request, response)=>{
    const url = request.url;
    const metodo = request.method;
    switch (url) {
        case '/':
            if (metodo=== 'GET') {
               await ruta1(request,response)
            } else {
                response.writeHead(405, { 'Content-Type': 'text/plain' });
                response.end('error ruta 1');
            }
            break;  

        case '/api/usuarios':
            if (metodo === 'GET') {
                await ruta2(request,response)
            } else {
                response.writeHead(405, { 'Content-Type': 'text/plain' });
                response.end('error ruta 2');
            }
            break;

        case '/api/usuarios/export':
            if (metodo === 'GET') {
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end('Ruta 3');
            } else {
                response.writeHead(405, { 'Content-Type': 'text/plain' });
                response.end('error ruta 3');
            }
            break;

        case '/api/usuarios/import':
            if (metodo === 'POST') {
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end('Ruta 4');
            } else {
                response.writeHead(405, { 'Content-Type': 'text/plain' });
                response.end('error ruta 4');
            }
            break;

        default:
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end(' ruta no valida ');
            break;
    }

})

server.listen(PORT, ()=>console.log(`servidor en http://localhost:${PORT}`))
