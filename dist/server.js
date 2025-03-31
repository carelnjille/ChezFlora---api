"use strict";
// Serveur Express 
require('dotenv').config();
const app = require('./dist/app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});