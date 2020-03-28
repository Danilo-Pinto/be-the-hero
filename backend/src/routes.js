const routes = require('express').Router();

const OngController = require('./controllers/OngsController');
const IncedentController = require('./controllers/IncedentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs' ,OngController.create);

routes.get('/profile',ProfileController.index);

routes.get('/incedents',IncedentController.index);
routes.post('/incedents',IncedentController.create);
routes.delete('/incedents/:id',IncedentController.delete);

module.exports = routes;