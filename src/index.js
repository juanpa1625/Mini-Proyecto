import { PORT } from "./config.js";
import http from 'node:http'
import { pool } from "./db.js";
import  fs  from "node:fs/promises";



const server = http.createServer(async(request, response)=>{
    const url = request.url;
    const metodo = request.method;
    switch (url) {
        case '/':
            if (metodo=== 'GET') {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                const data = await fs.readFile('./publico/index.html', 'utf-8');
                    response.end(data);
            } else {
                response.writeHead(405, { 'Content-Type': 'text/plain' });
                response.end('error ruta 1');
            }
            break;  

        case '/api/usuarios':
            if (metodo === 'GET') {
                try {
                    const [rows] = await pool.query("SELECT * FROM usuarios");
                    await fs.writeFile("src/test.txt", JSON.stringify(rows), "utf-8");
                    response.writeHead(200, {
                        "Content-Type": "application/json; charset=utf-8",
                    });
                    response.end(JSON.stringify(rows));
                } catch (error) {
                    console.error("Error al obtener usuarios o escribir el archivo:", error);
                    response.writeHead(500, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'Error interno del servidor' }));
                }
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
