module.exports.show = function(req,res) {
    var id = req.params.id;

    res.setHeader("Content-Type", 'text/html');
    res.send("<html><head><title>Adventures - NodeSlash</title></head><body><h1>Ogre-slaying knife</h1><p>It has +9 against ogres. It was id #" + id + "</p></body></html>");
}