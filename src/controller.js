import fs from 'node:fs/promises';
import { pool } from './db.js';
import path from "node:path";


export const ruta1 = async (request,response) => {
    try {
        const rutaHtml = path.resolve('./publico/index.html')
        const data = await fs.readFile(rutaHtml, 'utf-8');
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
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
        const rutaTxt =path.resolve("src/test.txt")
        await fs.writeFile(rutaTxt, JSON.stringify(resultado[0]), "utf-8");
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



export const ruta3 = async (request, response) => {
    try {
        const [resultado] = await pool.query('SELECT * FROM usuarios');
        const data = resultado.map(columna => Object.values(columna).join(',')).join('\n');
        const cabecera = 'id,nombres,apellidos,direccion,email,dni,edad,fecha_creacion,telefono\n';
        const csv = cabecera + data;
        const rutaExport = path.resolve('./src/usuarios.csv')
        await fs.writeFile(rutaExport, csv);
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(csv);
     
    } catch (err) {
        console.error("Error al exportar usuarios:", err);
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Error al exportar los usuarios' }));
    }
};
 

const validar = (fields) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return fields.id && fields.nombres && fields.apellidos && fields.direccion && emailRegex.test(fields.email) && fields.dni && fields.edad && fields.fecha_creacion && fields.telefono;
};

export const ruta4 = async (request, response) => {
    try {
        const ruta = path.resolve("./src/usuarios.csv");
        const informacion = (await fs.readFile(ruta, "utf-8")).split("\n");
        let cabecera = informacion[0].split(",");
        const cuerpo = informacion.slice(1);

    

        for (const lineas of cuerpo) {
            let dato = lineas.split(",");

            
            if (!validar({
                id: dato[0],
                nombres: dato[1],
                apellidos: dato[2],
                direccion: dato[3],
                email: dato[4],
                dni: dato[5],
                edad: dato[6],
                fecha_creacion: dato[7],
                telefono: dato[8]
            })) {
                console.log(`Datos inválidos para el usuario con ID ${dato[0]}.`);
                continue;
            }

            
            const [filas] = await pool.query('SELECT * FROM usuarios WHERE id = ? OR email = ?', [dato[0], dato[4]]);
            if (filas.length === 0) {
                await pool.query(
                    `INSERT INTO usuarios (${cabecera[0]},${cabecera[1]},${cabecera[2]},${cabecera[3]},${cabecera[4]},${cabecera[5]},${cabecera[6]},${cabecera[7]},${cabecera[8]}) VALUES (?,?,?,?,?,?,?,?,?)`,
                    dato
                );
            } else {
                console.log(`No se pudo introducir en la tabla: ID o email repetido para ID ${dato[0]} y email ${dato[4]}`);
            }
        } 
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Usuarios importados exitosamente' }));
    } catch (error) {
        console.error("Error al importar el archivo", error);
        response.writeHead(500, { "Content-Type": "text/plain;" });
        response.end(JSON.stringify({ message: "Error en el servidor" }));
    }
};