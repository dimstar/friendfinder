let fs = require('fs');
module.exports = class {
    constructor(app){
        // accept inbound from doc root
        app.get('/api/friends', (req, res) => this.apiGetData(req, res));
        // accept request on survey
        app.post('/api/friends', (req, res) => this.apiFriendFinder(req, res));
    }

    apiGetData(request, response){
        response.setHeader('Content-Type', 'text/plain');
        let allFriends = [];
        fs.readFile(process.cwd() + '/app/data/friends.js', 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data);
            allFriends = data;
            response.end(JSON.stringify( allFriends, null, 2));
        });
    }

    apiFriendFinder(request, response){
        // the json comes from the post as a string
        let newFriendData = request.body;
        response.setHeader('Content-Type', 'text/plain');
        console.log( newFriendData);
        fs.readFile(process.cwd() + '/app/data/friends.js', 'utf8', (err, allFriendsData) => {
            if (err) throw err;
            // console.log(allFriendsData);

            let allFriendsDataParse = JSON.parse(allFriendsData);
            
            // add the new submission to the noSql db
            this.writeFriendData( newFriendData, allFriendsDataParse);
            // find the matching friend
            
            allFriendsDataParse.unshift( newFriendData);

            let matchingFriend = allFriendsDataParse.map(this.calculateFriendMatch);
            matchingFriend.sort(this.sortScores);
            

            // send data back to be handled
            response.end(JSON.stringify( matchingFriend, null, 2));
          });
    }

    writeFriendData(newFriend, friendData){
        friendData.push(newFriend);
        let newRecords = JSON.stringify(friendData);
        fs.writeFile( process.cwd() + '/app/data/friends.js', newRecords, (err) => {
            if (err) throw err;
            // console.log(`Writen to file to file ${newRecords}`);
        });
    }



    calculateFriendMatch( friend, index, shubang){
        console.log('friend', friend);
        console.log('index', index);
        console.log('shubang', 'naw');
        if(index === 0 || friend.scores === undefined) return; //skip the first friend as its you!
        console.log('scores!', shubang[0]['scores[]']);
        return +(friend.scores.reduce( (accum, currentVal) => accum + parseInt(+currentVal) ) - shubang[0]['scores[]'].reduce( (accum, currentVal) => accum + parseInt(+currentVal) ));
    }

    sortScores(a,b) {
        return a - b;
    }

}