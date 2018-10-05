//Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//Databases
const actions = require('./data/helpers/actionModel.js');
const projects = require('./data/helpers/projectModel.js');

const server = express();
server.use(express.json());

const port = 8000;

//Middlewares
server.use(cors());
server.use(morgan('combined'));

//==============ACTIONS ROUTE HANDLERS==============

//GET all actions
server.get('/api/actions', (req, res)=> {
    actions.get()
        .then(actions=> {
            console.log(actions);
            if (!actions) {
                res.status(404).json({error: "There are no actions to display"});
            }
            res.status(200).json({actions});
        })
        .catch(err=> {
            res.status(500).json({error: "The list of actions could not be retrieved from the database"});
        })
});

//GET one action by its unique ID
server.get('/api/actions/:id', (req, res)=> {
    console.log(req.params.id);
    actions.get(req.params.id)
        .then(action=> {
            console.log(action);
            if (!req.params.id) {
                res.status(404).json({error: "An action with that ID does not exist"});
            }
            res.status(200).json({action});
        })
        .catch(err=> {
            res.status(500).json({error: "The action could not be retrieved from the database."});
        })
});

//POST new action to the database
server.post('/api/actions', (req, res)=> {
    console.log(req.body);
    const {description, notes, project_Id} = req.body;
    const newAction = {description, notes, project_Id};
    actions.insert(newAction)
        .then(actionId=> {
            const {id} = actionId;
            actions.get(id)
                .then(action=> {
                    if (!req.body) {
                        res.status(400).json({error: "Please provide the necessary information for this action"});
                    }
                    res.status(201).json({action});
                })
        })
        .catch(err=> {
            res.status(500).json({error: "This action could not be added to the database"});
        })
});

//DELETE existing action from the database
server.delete('/api/actions/:id', (req, res)=> {
    console.log(req.params);
    const {id} = req.params;
    actions.remove(id)
        .then(action=> {
            if (!action) {
                res.status(404).json({message: "The action with the specified ID does not exist."});
            }
            res.status(200).json({action});
        })
        .catch(err=> {
            res.status(500).json({error: "The action could not be removed from the database"});
        })
});

//PUT an update on an existing action
server.put('/api/actions/:id', (req, res)=> {
    const {id} = req.params;
    const {description, notes} = req.body;
    console.log(req.body);
    const updatedAction = {description, notes};
    actions.update(id, updatedAction)
        .then(updatedAction=> {
            if (!updatedAction) {
                res.status(404).json({error: "This action does not exist"});
            } else if (!req.body) {
                res.status(400).json({error: "Please add a description and notes for this action"});
            } else {
                res.status(200).json({updatedAction});
            }
        })
        .catch(err=> {
            res.status(500).json({error: "This information could not be saved to the database"});
        })
});
        

//==============PROJECTS ROUTE HANDLERS==============

//GET all projects
server.get('/api/projects', (req, res)=> {
    projects.get()
        .then(projects=> {
            console.log(projects);
            if (projects === 0) {
                res.status(404).json({error: "There are no projects to display"});
            }
            res.status(200).json({projects});
        })
        .catch(err=> {
            res.status(500).json({error: "This information could not be retrieved from the database"});
        })
});


//GET one project by its unique ID
server.get('/api/projects/:id', (req, res)=> {
    const {id} = req.params.id;
    projects.get(id)
        .then(project=> {
            console.log(project);
            if (!req.params.id) { 
                res.status(404).json({error: "A project by this ID does not exist"});
            }
            res.status(200).json({project});
        })
        .catch(err=> {
            res.status(500).json({error: "This information could not be retrieved from the database"});
        })
});

//POST a new project to the database
server.post('/api/projects', (req, res)=> {
    const {name, description} = req.body;
    const newProject = {name, description};
    projects.insert(newProject)
    .then(projectId=> {
        const {id} = projectId;
        projects.get(id)
            .then(project=> {
                if (!req.body) {
                    res.status(400).json({error: "Please provide the necessary information for this project"});
                }
                res.status(201).json({project});
            })
    })
    .catch(err=> {
        res.status(500).json({error: "This project could not be added to the database"});
    })
});

//DELETE a project from the database
server.delete('/api/projects/:id', (req, res)=> {
    const {id} = req.params;
    console.log(id);
    projects.remove(id)
        .then(project=> {
            if (!project) {
                res.status(404).json({error: "This project does not exist"});
            }
            res.status(200).json({project});
        })
        .catch(err=> {
            res.status(500).json({error: "This project could not be deleted from the database"});
        })
});


//PUT an update on an existing project
server.put('/api/projects/:id', (req, res)=> {
    console.log(req.params);
    const {id} = req.params;
    const {name, description} = req.body;
    console.log(req.body);
    const updatedProject = {name, description};
    projects.update(id, updatedProject)
        .then(updatedProject=> {
            if (!updatedProject) {
                res.status(404).json({error: "This project does not exist"});
            } else if (!req.body) {
                res.status(400).json({error: "Please add a name and description for this project"});
            } else {
                res.status(200).json({updatedProject});
            }
        })
        .catch(err=> {
            res.status(500).json({error: "This information could not be saved to the database"});
        })
});

server.get('/api/projects/actions/:project_id', (req, res)=> {
    console.log(req.params.project_id);
    const {project_id} = req.params.project_id;
    projects.getProjectActions(project_id)
        .then(actionsForProject=> {
            if (!actionsForProject) {
                res.status(404).json({error: "There are no actions for this project"});
            }
            res.status(200).json({actionsforProject});
        })
        .catch(err=> {
            res.status(500).json({error: "This information could not be retrieved from the database"});
        })
});

//Listener
server.listen(port, ()=> console.log(`API running on port ${port}`));