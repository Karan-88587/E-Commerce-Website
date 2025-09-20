require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const AuthRoute = require('./routes/AuthRoute');
const ProductRoute = require('./routes/ProductRoute');

const port = process.env.PORT || 3000;
const app = express();

connectDB();

const corsOptions = {
    origin: [process.env.CORS_ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
    credentials: true
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/auth', AuthRoute);
app.use('/api/products', ProductRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});