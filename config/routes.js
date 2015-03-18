module.exports = function(app) {
    var homeRoutes = App.route('homeRoutes');
    var adventureRoutes = App.route('adventureRoutes');
    var lootRoutes = App.route('lootRoutes');
    var bestiaryRoutes = App.route('bestiaryRoutes');
    var userRoutes = App.route('userRoutes');
    
    app.get("/", homeRoutes.home);
    
    //app.post('/login', handlers.login);
    app.get("/adventures", adventureRoutes.index);
    app.post("/adventures", adventureRoutes.create);
    app.put("/adventures/:id", adventureRoutes.update);
    
    app.get('/loot', lootRoutes.index);
    app.get("/loot/:id", lootRoutes.show);
    
    app.get('/bestiary', bestiaryRoutes.index);
    
    app.get('/sign_up', userRoutes.new);
    app.post('/sign_up', userRoutes.create);
    
;};