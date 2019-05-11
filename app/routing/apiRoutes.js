var friends = require('../data/friends');

module.exports = function(app) {
    //GET route used to display a JSON of all possible friends.
    app.get('/api/friends', function(req, res) {
        console.log("getting this!!")
        res.json(friends.allFriends);

    });

    //POST route that handles incoming survey results & compatibility logic.
    app.post('/api/friends', function(req, res) {
        var newFriend = req.body;
        friends.push(newFriend);

        res.json(newFriend);
    });
};
