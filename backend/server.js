const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',        // Host
  user: 'root',             // Username
  password: '',             // Password
  database: 'laporan'     // Database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

// API endpoint to add a pemasukan
app.post('/pemasukan', (req, res) => {
  const { tanggal, kategori, nominal, sumber_dana, keterangan } = req.body;
  const query = 'INSERT INTO pemasukan (tanggal, kategori, nominal, sumber_dana, keterangan) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [tanggal, kategori, nominal, sumber_dana, keterangan], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, tanggal, kategori, nominal, sumber_dana, keterangan });
  });
});

// API endpoint to get all data for pemasukan
app.get('/pemasukan', (req, res) => {
  const query = 'SELECT * FROM pemasukan';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
});

// API endpoint to delete pemasukan
app.delete('/pemasukan/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM pemasukan WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
});

// API endpoint to add a pengeluaran
app.post('/pengeluaran', (req, res) => {
  const { tanggal, kategori, nominal, sumber_dana, keterangan } = req.body;
  const query = 'INSERT INTO pengeluaran (tanggal, kategori, nominal, sumber_dana, keterangan) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [tanggal, kategori, nominal, sumber_dana, keterangan], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, tanggal, kategori, nominal, sumber_dana, keterangan });
  });
});

// API endpoint to get all data for pengeluaran
app.get('/pengeluaran', (req, res) => {
  const query = 'SELECT * FROM pengeluaran';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
});

// API endpoint to delete pengeluaran
app.delete('/pengeluaran/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM pengeluaran WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
