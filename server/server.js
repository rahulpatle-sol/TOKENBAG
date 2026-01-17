require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tokenRoutes = require('./routes/tokenRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tokens', tokenRoutes);

// Health Check
app.get('/', (req, res) => res.send('TokenBag Server is Flying! 🚀'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server started on port ${PORT}`));