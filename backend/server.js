// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';

// import connectDB from './config/db.js';

// import authRoutes from './routes/authRoutes.js';
// import productRoutes from './routes/productRoutes.js';

// dotenv.config();

// /* CONNECT DATABASE */

// connectDB();

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);

// app.get('/', (req, res) => {
//   res.send('OLX API Running...');
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(
//     `Server running on port ${PORT}`
//   );
// });

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'OLX API Running...' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});