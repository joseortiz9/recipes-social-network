const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./database');

// Setting
const PORT = process.env.PORT || 4000;

// Middleware
// Para poder rellenar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: ['*', 'http://localhost:3000']
}));

// routes
app.use(require('./routes'));

// START server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

    sequelize.authenticate().then(() => {
        console.log("db connected...");
    });
});