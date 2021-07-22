const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const sheltersRouter = require('./routes/shelters');
const usersRouter = require('./routes/users');
const animalsRouter = require('./routes/animals');
const bookingsRouter = require('./routes/bookings');
const clientsRouter = require('./routes/clients');
const imagesRouter = require('./routes/images');

app.use('/shelters', sheltersRouter);
app.use('/users', usersRouter);  
app.use('/animals', animalsRouter);
app.use('/bookings', bookingsRouter);
app.use('/clients', clientsRouter);
app.use('/images', imagesRouter);  

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
