import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Lee variables de .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware para leer JSON

app.get('/', (_req, res) => {
  res.send('Hola Jefe Julian 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
