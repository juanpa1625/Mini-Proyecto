import fs from 'node:fs/promises';
import { pool } from './db.js';

export const ruta1 = async (request,response) => {
    try {
        const data = await fs.readFile('./publico/index.html', 'utf-8');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(data);
    } catch (error) {
        console.error('Error al leer el archivo index.html:', error);
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Error interno del servidor');
    }
};

export const ruta2 = async (request,response) => {
    try {
        const resultado = await pool.query("SELECT * FROM usuarios");
        await fs.writeFile("src/test.txt", JSON.stringify(resultado[0]), "utf-8");
        response.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
        });
        response.end(JSON.stringify(resultado[0]));
    } catch (error) {
        console.error("Error al obtener usuarios o escribir el archivo:", error);
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Error interno del servidor' }));
    }
};