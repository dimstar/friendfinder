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
        response.setHeader('Content-Type', 'text/plain');

        fs.readFile(process.cwd() + '/app/data/friends.js', 'utf8', (err, allFriendsData) => {
            if (err) throw err;
            // console.log(allFriendsData);

            let allFriendsDataParse = JSON.parse(allFriendsData);
            
            // add the new submission to the noSql db
            this.writeFriendData(request.body, allFriendsDataParse);
            // find the matching friend
            
            allFriendsDataParse.unshift(request.body);

            let matchingFriend = allFriendsDataParse.map(this.calculateFriendMatch);
            matchingFriend.sort(sortScores);
            

            // send data back to be handled
            response.end(JSON.stringify( matchingFriend, null, 2));

            writeData()
          });
    }

    writeFriendData(newFriend, friendData){
        friendData.push(newFriend);
        let newRecords = JSON.stringify(friendData);
        fs.appendFile( process.cwd() + '/app/data/friends.js', newRecords, (err) => {
            if (err) throw err;
            console.log(`Appended to file ${newRecords}`);
        });
    }

    addScores(accum, currentVal) {
        return accum + parseInt(+currentVal);
    }

    calculateFriendMatch( friend, index, shubang){
        console.log('friend', friend);
        console.log('index', index);
        console.log('shubang', 'naw');
        if(index === 0) return; //skip the first friend as its you!
        return +(friend.scores.reduce( addScores ) - shubang[0].scores.reduce( addScores ));
    }

    sortScores(a,b) {
        return a - b;
    }

}