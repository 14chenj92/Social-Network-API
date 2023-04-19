const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.once('open', async () => {
const userData = [
    {
    username: 'Jim',
    email: 'Jim@gmail.com',
    },
    {
    username: 'Jon',
    email: 'Jon@gmail.com',
    },
    {
    username: 'Tim',
    email: 'Tim@gmail.com',
    },
]

const thoughtData = [
    {
    username: 'Jim',
    thoughtText: 'Hello',
    },
    {
    username: 'Jon',
    thoughtText: 'Hi',
    },
    {
    username: 'Tim',
    thoughtText: 'Bye',
    },
]

await User.collection.insertMany(userData);

await Thought.collection.insertMany(thoughtData);
});

