const express = require('express');
const massive = require('massive');
const dotenv = require('dotenv');
const { addCharacter } = require('./characterController');
const { getCharacter } = require('./characterController');

dotenv.config();

const app = express();
app.use(express.json());

massive({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})
    .then( (dbInstance) => {
        app.set('db', dbInstance);
        console.log('Successfully established connection with remote database.')
    })
    .catch( (e) => {
        console.log(e);
        return e;
    })

    app.post('/api/characters', addCharacter);
    app.get('/api/characters/:id', getCharacter);

app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}`));

