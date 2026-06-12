const express = require('express');
const cors = require('cors');

const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

// Allow CORS from the frontend during development. Set CORS_ORIGIN in production if needed.
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.use('/tickets', ticketRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});