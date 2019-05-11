$("#submit-survey").on("click", function(event) {
    event.preventDefault();

    //makes an object with username, userimage, and empty array to later hold the survey responses
    var surveyData = {
        userName: $("#name-text").val().trim(),
        userImage: $("#image-text").val().trim(),
        surveyResponses: []
    };

    //loop to get all of the survey response data from the 10 questions
    for(i=1; i<11; i++) {
        surveyData.surveyResponses.push($(`#question${i}`).val())
    }
    console.log(surveyData);
    postData(surveyData);

});


function postData(userData) {
    $.post("/api/friends", userData, function(data) {
        console.log(`Posting data ${data}`);
        // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        // $("#match-name").text(data.name);
        // $("#match-img").attr("src", data.photo);
    
        // Show the modal with the best match
        // $("#results-modal").modal("toggle");
    
    });

    //Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`)

    //take this array and confirm compatibility
    getFriendData(userData);
}


function getFriendData(newFriend) {
    console.log("I'm in the get friends function!")

    checkCompatibility(newFriend, allFriends);
}


function checkCompatibility(userData) {
    //With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`

    //Example:
        //User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
        //User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
        //Total Difference: **2 + 1 + 2 =** **_5_**

    //Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both `5-3` and `3-5` as `2`, and so on.
    
    //The closest match will be the user with the least amount of difference.

    //run modal

}
