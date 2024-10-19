const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'tu_base_de_datos.db'), (err) => {
  if (err) {
    console.error('Error al abrir la base de datos', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

const createTables = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS notificaciones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER,
            mensaje TEXT,
            tipo TEXT,
            leido BOOLEAN DEFAULT 0,
            fecha DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    db.run(sql, (err) => {
        if (err) {
            console.error('Error al crear la tabla notificaciones:', err.message);
        } else {
            console.log('Tabla notificaciones creada o ya existe.');
        }
    });
};

const executeSql = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

createTables();

module.exports = { db, executeSql };