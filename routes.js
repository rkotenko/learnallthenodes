module.exports = function(app, handlers) {
    var ensureAuthenticated = require('./ensureAuthenticated');
    
    app.get("/", handlers.home);
    app.get("/read_from_db", handlers.readFromDB)
    app.post('/login', handlers.login);
    app.all('/*', ensureAuthenticated);
    app.get("/adventures", handlers.adventuresIndex);
    app.post("/adventures", handlers.createAdventure);
    app.put("/adventures/:id", handlers.updateAdventure);
    app.get("/loot/:id", handlers.showLoot);
};
