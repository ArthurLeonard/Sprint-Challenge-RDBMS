const express = require('express'); // import the express package
const helmet = require('helmet'); // for generic security
const knex = require('knex'); // middleman between js and SQL

const server = express(); // creates the server
server.use(express.json()); // allows us to parse json
server.use(helmet());   // activate helmet


const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

server.get('/', (req, res) => {
  res.send('Hello Mom');
});


function find() {
    return db('projects');
  }
  
  function findById(id) {
    return db('roles')
      .where({ id })
      .first();
  }


  server.get('/api/projects', async (req, res) => {
    
    try {
      const projects = await db('projects'); // attempt to get all projects from the table
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  
  server.get('/api/actions', async (req, res) => {
    
    try {
      const actions = await db('actions');
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
   
  server.post('/api/projects', async (req, res) => {
    try {
      const [id] = await db('projects').insert(req.body);
  
      const action = await db('projects')
        .where({ id: id })
        .first();
  
      res.status(201).json(action);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  server.post('/api/actions', async (req, res) => {
    try {
      const [id] = await db('actions').insert(req.body);
  
      const action = await db('actions')
        .where({ id: id })
        .first();
  
      res.status(201).json(action);
    } catch (error) {
      res.status(500).json({ error });
    }
  });





server.listen(3000, () =>
  console.log('Server running on http://localhost:3000')
);
