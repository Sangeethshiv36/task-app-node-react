const db = require('./db.json');
const express = require('express');

const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ content: 'welcome' }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
