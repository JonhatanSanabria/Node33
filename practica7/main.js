const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuración del puerto
const PORT = 3000;

// Ruta al archivo JSON
const dbPath = path.join(__dirname, 'db.json');

// Función para leer la base de datos
const readDatabase = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

// Función para escribir en la base de datos
const writeDatabase = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

// Función para manejar las solicitudes
const requestHandler = (req, res) => {
    const { method, url } = req;

    if (url === '/koders') {
        if (method === 'GET') {
            // Manejar solicitud GET
            const db = readDatabase();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db.items));
        } else if (method === 'POST') {
            // Manejar solicitud POST
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const newItem = JSON.parse(body);
                const db = readDatabase();
                db.items.push(newItem);
                writeDatabase(db);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newItem));
            });
        } else if (method === 'DELETE') {
            // Manejar solicitud DELETE
            const db = readDatabase();
            db.items = [];
            writeDatabase(db);
            res.writeHead(204);
            res.end();
        } else if (method === 'PATCH') {
            // Manejar solicitud PATCH
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const { index, newItem } = JSON.parse(body);
                const db = readDatabase();
                if (index >= 0 && index < db.items.length) {
                    db.items[index] = newItem;
                    writeDatabase(db);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newItem));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Item not found' }));
                }
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
};

// Crear el servidor
const server = http.createServer(requestHandler);

// Hacer que el servidor escuche en el puerto especificado
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
