$("#submitSurvey").on("click", function(event) {
    
    var newFriend = {
        name: $("#name").val().trim(),
        profile_img: $("#profile_img").val().trim(),
        scores: [0]
    };

    var sendFriend = function(newFriend){
        // Question: What does this code do??
        $.post("/api/friends", newFriend)
            .then(function(data) {
                // console.log(data);
                alert("Adding friend...");
            });
    }

    $('input[type="range"]').each(function(index){
        // var inputId = $(this).attr('id');
        var inputVal = $(this).val();
        newFriend['scores'].push( Math.ceil( inputVal/20 ) );// get the value to 0 and 5, round up
        // we're done
        if(index === ($('input[type="range"]').length -1)){
            sendFriend(newFriend);
        }
    });



});