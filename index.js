
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const users = [
    {id: 1, name: 'Diego'},
    {id: 2, name: 'Maria'},
    {id: 3, name: 'Joao'},
    {id: 4, name: 'Pedro'},
    {id: 5, name: 'Claudia'},
];

var schema = buildSchema(`
type Query {
    findAll: [User!]
    find(id: ID): User
}

type User {
    id: ID
    name: String
}
`);

var root = {
    findAll: () => users,
    find: (params) => {
        var usersFiltered = users.filter(u => u.id == params.id);
        return usersFiltered.length > 0 ? usersFiltered[0] : null;
    }
};

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, res => console.log('Started, access to url: http://localhost:4000/graphql'))