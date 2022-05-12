// const express = require('express');
// const router = require('./routes/index.js');
// const db = require('./config/db.js');
// const cors = require('cors');

// const app = express();

// // Enable CORS
// app.use(cors());

// // Connect to DB
// db.authenticate()
//     .then( () => console.log('DB Connected'))
//     .catch( error => console.log(error));

// // Define port
// const port = process.env.PORT || 3001;

// // Body Parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Add router
// app.use('/', router);


// app.listen(port, () => {
//     console.log(`Server Working at Port: ${port}`);
// });