const express = require('express');
const app = express();
const fetchRoutes = require('./routes/fetchRoutes');
const articleRoutes = require('./routes/articleRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', fetchRoutes); // Fetch API from router
app.use('/articles', articleRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

