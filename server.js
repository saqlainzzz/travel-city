require('dotenv').config();
require('./src/models/db');

const travelExpenseRoutes = require("./src/routes/travelExpenseRoutes")
const authRoutes = require("./src/routes/authRoutes")

const express = require('express');
const hotelRoutes = require("./src/routes/hotel")
const cors = require('cors');
const morgan = require('morgan');
const notFound = require('./src/middlewares/notFound');
const restaurantRoutes = require("./src/routes/restaurant");
const cityRoutes = require("./src/routes/city");

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/hotels", hotelRoutes)

app.get('/check', (req, res) => {
  res.json({
    success: true,
    message: 'Travel City Explorer API is running',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// TODO: EVERYONE CREATE YOUR ROUTES FROM HERE
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/travel-expenses", travelExpenseRoutes)
 
app.use("/api/auth", authRoutes)


const placeRoutes = require("./src/routes/Place")
app.use("/api/places", placeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
