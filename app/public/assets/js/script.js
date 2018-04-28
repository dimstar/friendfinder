$("#submitSurvey").on("click", function(event) {
    
    var newFriend = {
        name: $("#name").val().trim(),
        profile_img: $("#profile_img").val().trim()
    };

    $('input[type="range"]').each(function(){
        var inputId = $(this).attr('id')
        var inputVal = $(this).val();
        newFriend[inputId] = Math.ceil( inputVal/20 );// get the value to 0 and 5, round up
    });

    var newFriend = function(newFriend){
        // Question: What does this code do??
        $.post("/api/characters", newFriend)
            .then(function(data) {
                console.log(data);
                alert("Adding friend...");
            });
    }


    newFriend(newFriend);
});