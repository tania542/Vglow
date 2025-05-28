const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const allowedOrigins = ['http://127.0.0.1:5501', 'http://localhost:5501'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Conexión a MySQL sin base de datos definida aún (la creamos si no existe)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');

  // Crear base de datos si no existe
  db.query('CREATE DATABASE IF NOT EXISTS vglow', (err) => {
    if (err) {
      console.error('Error creando la base de datos:', err);
      return;
    }
    console.log('Base de datos vglow creada o ya existe.');

    // Usar la base de datos creada
    db.changeUser({ database: 'vglow' }, err => {
      if (err) {
        console.error('Error cambiando a base de datos vglow:', err);
        return;
      }
      // Crear tabla contacto si no existe
      const createTable = `
        CREATE TABLE IF NOT EXISTS contacto (
          id INT PRIMARY KEY AUTO_INCREMENT,
          nombre VARCHAR(50) UNIQUE NOT NULL,
          numero VARCHAR(15) UNIQUE NOT NULL,
          correo VARCHAR(100) UNIQUE NOT NULL,
          mensaje VARCHAR(255) NOT NULL,
          enviado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      db.query(createTable, (err) => {
        if (err) {
          console.error('Error creando tabla contacto:', err);
          return;
        }
        console.log('Tabla contacto creada o ya existe.');
      });
    });
  });
});

// Ruta para recibir el formulario
app.post('/enviar-contacto', (req, res) => {
  const { name, phone, email, message } = req.body; // Extrae los datos enviados en el cuerpo de la solicitud

  // Validación: si alguno de los campos está vacío, devuelve error 400 (solicitud incorrecta)
  if (!name || !phone || !email || !message) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  // Consulta SQL para insertar los datos en la tabla "contacto"
  const sql = 'INSERT INTO contacto (nombre, numero, correo, mensaje) VALUES (?, ?, ?, ?)';
  
  // Ejecuta la consulta con los valores enviados
  db.query(sql, [name, phone, email, message], (err, result) => {
    // Si ocurre un error al guardar los datos, muestra un mensaje de error y responde con estado 500
    if (err) {
      console.error('Error al insertar contacto:', err);
      return res.status(500).json({ message: 'Error al guardar los datos.' });
    }
    // Si todo sale bien, responde con estado 200 y un mensaje de éxito
    res.status(200).json({ message: 'Mensaje enviado correctamente.' });
  });
});

// Inicia el servidor y lo pone a trabajar en el puerto definido
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
