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
        // console.log( newFriendData);
        fs.readFile(process.cwd() + '/app/data/friends.js', 'utf8', (err, allFriendsData) => {
            if (err) throw err;
            // console.log(allFriendsData);

            let friendSearchData = JSON.parse(allFriendsData);

            // find the matching friend
            
            friendSearchData.forEach( (friend, index, allFriends)=>{
                let totalDifference = this.matrixCompare(friend.scores, newFriendData.scores);
                friendSearchData[index].diff = totalDifference;
                console.log('total diff: ', totalDifference);
            });

            let matchingFriend = friendSearchData.sort(this.sortFriends);
        
            console.log('everybody have fun!', friendSearchData);
            // send data back to be handled
            response.end(JSON.stringify( matchingFriend[0], null, 2));

            // add the new submission to the noSql db
            this.writeFriendData( newFriendData, friendSearchData);
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

    matrixCompare(a, b){
        let c = Array();
        for(let i = 0; i < a.length; i++){
             let diff = +a[i] - +b[i];
             c[i] = Math.abs(diff);
        }
        console.log('c array', c);
        return c.reduce(this.addArray);
    }

    addArray(a, b){
        return +a + +b;
    }

    sortFriends(friendA, friendB){
        return friendA.diff - friendB.diff;
    }

}