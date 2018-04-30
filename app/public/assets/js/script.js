$("#submitSurvey").on("click", function(event) {
    
    var newFriend = {
        'name': $("#name").val().trim(),
        'profile_img': $("#profile_img").val().trim(),
        'scores': Array()
    };

    var sendFriend = function(friendData){
        // Question: What does this code do??
        // $.post("/api/friends", JSON.stringify([friendData]))
        //     .then(function(data) {
        //         // console.log(data);
        //         alert("Adding friend...");
        //     });

            $.ajax({
                url: "/api/friends"
            ,   type: 'POST'
            ,   contentType: 'application/json'
            ,   data: JSON.stringify(friendData) //stringify is important
            ,   success: function(response){
                alert(response);
            }
            });
    }

    $('input[type="range"]').each(function(index){
        // var inputId = $(this).attr('id');
        var inputVal = $(this).val();
        inputVal = Math.ceil( inputVal/20 );
        newFriend.scores.push( inputVal );// get the value to 0 and 5, round up
        // we're done
        if(index === ($('input[type="range"]').length -1)){
            console.log(newFriend);
            // you MUST stringify to send, otherwise body parser gets wonky
            sendFriend(newFriend);
        }
    });



});