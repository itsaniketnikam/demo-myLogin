const loadRoutes = require('./modules/ayn/routes')


exports.loadRoutes = app => {
    app.use('/',loadRoutes);
 
}