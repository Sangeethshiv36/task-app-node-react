const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => res.json({ content: 'Hello' }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
