const db = require('../db');

exports.register = (req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const { nombre, email, password } = JSON.parse(body); // ahora se espera "email"

      const sql = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
      db.query(sql, [nombre, email, password], (err, result) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Error en la base de datos' }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Usuario registrado correctamente' }));
      });
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'JSON inválido' }));
    }
  });
};

exports.login = (req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const { email, password } = JSON.parse(body); // también se espera "email"

      const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
      db.query(sql, [email, password], (err, results) => {
        if (err || results.length === 0) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Credenciales inválidas' }));
        }

        const user = results[0];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Login exitoso', user }));
      });
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'JSON inválido' }));
    }
  });
};
