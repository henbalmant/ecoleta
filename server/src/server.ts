import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log('Listagem de usuários');

    response.json([
        'Henrique',
        'Roberto',
        'Tiago',
        'Daniel'
    ]);
});

app.post('/users', (request, response) =>{
    const user = {
        name: 'Henrique',
        email: 'contato@henrique.me'
    };

    return response.json(user);
});

app.listen(3333);
