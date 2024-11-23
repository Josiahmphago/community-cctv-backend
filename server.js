require('dotenv').config(); // Load environment variables
const express = require('express'); // Import Express
const mongoose = require('mongoose'); // Import Mongoose
const bodyParser = require('body-parser'); // Import Body Parser
const compression = require('compression'); // Import Compression

const authRoutes = require('./routes/auth'); // Import Auth Routes
const alertRoutes = require('./routes/alerts'); // Import Alert Routes

// MongoDB connection
console.log('Connecting to MongoDB...')
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(compression());

// MongoDB connection
/*mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Database connection error:', err));*/

// Routes
app.use('/auth', authRoutes);
app.use('/alerts', alertRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});
