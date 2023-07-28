const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const connectDB = require('./config/db');

const app = express();
dotenv.config();

connectDB();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Server is running on port: ${PORT}`)
);
