const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors()); // Enable CORS middleware
app.use(express.json());

const userRoutes = require('./routes/user.router');
app.use('/users', userRoutes);

// Connection to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to DB!!");
}).catch(err => {
  console.error("Error connecting to DB:", err);
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});
 