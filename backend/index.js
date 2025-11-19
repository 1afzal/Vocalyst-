const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/config/database');
const routes = require('./src/routes');
const { ensureDirectoryExists } = require('./src/utils/fileSystem');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/downloads', express.static('downloads'));

// Ensure directories exist
ensureDirectoryExists('downloads');
ensureDirectoryExists('uploads');

// Connect to database
connectDB();

// Routes
app.use('/api', routes);

const PORT = process.env.PORT || 6969;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
