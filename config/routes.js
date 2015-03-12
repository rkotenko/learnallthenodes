module.exports = function(app) {
    var homeRoutes = App.route('homeRoutes');
    var adventureRoutes = App.route('adventureRoutes');
    var lootRoutes = App.route('lootRoutes');
    
    app.get("/", homeRoutes.home);
    //app.post('/login', handlers.login);
    app.get("/adventures", adventureRoutes.index);
    app.post("/adventures", adventureRoutes.create);
    app.put("/adventures/:id", adventureRoutes.update);
    app.get("/loot/:id", lootRoutes.show)
;};