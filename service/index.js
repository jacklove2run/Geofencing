const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/report/:deviceId', (req, res) => {
    console.log(`Report home: ${req.params.deviceId}`);
    // TODO: Write timestamp + deviceId to MySQL database
    res.sendStatus(201);
});

app.listen(port, () => console.log(`Service starts on port ${port}!`));
